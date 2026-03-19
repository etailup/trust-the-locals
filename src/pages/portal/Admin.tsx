import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import PortalSidebar from '@/components/portal/PortalSidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

// ────────── Parser ──────────

interface ParsedContact {
  email: string
  name?: string
  company?: string
  phone?: string
  valid: boolean
}

function parseContacts(raw: string): ParsedContact[] {
  return raw
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      // Format: "First Last <email@domain.com>"
      const angleMatch = line.match(/^(.+?)\s*<([^>]+)>$/)
      if (angleMatch) {
        const name = angleMatch[1].trim()
        const email = angleMatch[2].trim()
        return { email, name, valid: isValidEmail(email) }
      }

      // Format: "email, Name, Company, Phone" (CSV)
      if (line.includes(',')) {
        const parts = line.split(',').map(p => p.trim())
        const email = parts[0]
        return {
          email,
          name: parts[1] || undefined,
          company: parts[2] || undefined,
          phone: parts[3] || undefined,
          valid: isValidEmail(email),
        }
      }

      // Plain email
      return { email: line, valid: isValidEmail(line) }
    })
}

function isValidEmail(email: string): boolean {
  const atIdx = email.indexOf('@')
  if (atIdx < 1) return false
  const domain = email.slice(atIdx + 1)
  return domain.includes('.') && domain.length > 2
}

// ────────── Row status ──────────

type RowStatus = 'pending' | 'sending' | 'ok' | 'error'

interface ContactRow extends ParsedContact {
  status: RowStatus
  message?: string
}

// ────────── Component ──────────

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Redirect non-admins — must be in useEffect, not inline render (React Router v6 rule)
  useEffect(() => {
    if (user !== null && !user?.is_admin) {
      navigate('/portal/experiences', { replace: true })
    }
  }, [user, navigate])

  if (!user?.is_admin) return null

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <PortalSidebar isOpen={sidebarOpen} />
      <main className="flex-1 p-4 md:p-8 md:ml-10">
        {/* Mobile header */}
        <div className="flex items-center gap-4 mb-6 md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            <span className="sr-only">Menu</span>
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
          <h1 className="text-xl font-luxury">Admin</h1>
        </div>

        <div className="hidden md:block mb-8">
          <h1 className="font-luxury text-3xl text-portal-dark">Admin</h1>
          <p className="text-portal-muted mt-1">Aggiungi contatti e invia email di accesso</p>
        </div>

        <Tabs defaultValue="bulk" className="max-w-3xl">
          <TabsList className="mb-6">
            <TabsTrigger value="bulk">Importa lista</TabsTrigger>
            <TabsTrigger value="single">Aggiungi uno</TabsTrigger>
          </TabsList>

          <TabsContent value="bulk">
            <BulkImportTab />
          </TabsContent>

          <TabsContent value="single">
            <SingleContactTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// ────────── Bulk Import Tab ──────────

function BulkImportTab() {
  const { toast } = useToast()
  const [raw, setRaw] = useState('')
  const [rows, setRows] = useState<ContactRow[]>([])
  const [parsed, setParsed] = useState(false)
  const [sending, setSending] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleParse = useCallback(() => {
    const contacts = parseContacts(raw)
    setRows(contacts.map(c => ({ ...c, status: 'pending' })))
    setParsed(true)
  }, [raw])

  const validRows = rows.filter(r => r.valid)

  const handleSend = async () => {
    setSending(true)
    setProgress(0)

    let sent = 0
    let errors = 0

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      if (!row.valid) continue

      // Update row to sending
      setRows(prev => prev.map((r, idx) => idx === i ? { ...r, status: 'sending' } : r))

      // Fresh session token every iteration
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast({
          title: 'Sessione scaduta',
          description: `La sessione è scaduta. ${sent} contatti inviati prima dell'interruzione. Effettua di nuovo il login.`,
          variant: 'destructive',
        })
        setRows(prev => prev.map((r, idx) => idx === i ? { ...r, status: 'error', message: 'sessione scaduta' } : r))
        setSending(false)
        return
      }

      try {
        const res = await fetch('/api/admin/import-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            email: row.email,
            name: row.name,
            company: row.company,
            phone: row.phone,
          }),
        })

        if (res.status === 401) {
          toast({
            title: 'Sessione scaduta',
            description: `${sent} contatti inviati prima dell'interruzione. Effettua di nuovo il login.`,
            variant: 'destructive',
          })
          setRows(prev => prev.map((r, idx) => idx === i ? { ...r, status: 'error', message: 'sessione scaduta' } : r))
          setSending(false)
          return
        }

        const json = await res.json()

        if (json.status === 'ok') {
          sent++
          setRows(prev => prev.map((r, idx) => idx === i ? { ...r, status: 'ok' } : r))
        } else {
          errors++
          setRows(prev => prev.map((r, idx) => idx === i ? { ...r, status: 'error', message: json.message } : r))
        }
      } catch {
        errors++
        setRows(prev => prev.map((r, idx) => idx === i ? { ...r, status: 'error', message: 'errore di rete' } : r))
      }

      setProgress(sent)
    }

    setSending(false)
    toast({
      title: 'Completato',
      description: `${sent} inviati, ${errors} errori.`,
    })
  }

  const retryRow = async (index: number) => {
    const row = rows[index]
    setRows(prev => prev.map((r, idx) => idx === index ? { ...r, status: 'sending' } : r))

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setRows(prev => prev.map((r, idx) => idx === index ? { ...r, status: 'error', message: 'sessione scaduta' } : r))
      return
    }

    const res = await fetch('/api/admin/import-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ email: row.email, name: row.name, company: row.company, phone: row.phone }),
    })
    const json = await res.json()

    setRows(prev => prev.map((r, idx) =>
      idx === index
        ? { ...r, status: json.status === 'ok' ? 'ok' : 'error', message: json.message }
        : r
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="contacts-raw" className="text-sm font-medium mb-2 block">
          Incolla la lista di contatti
        </Label>
        <p className="text-sm text-portal-muted mb-2">
          Formati supportati (uno per riga):<br />
          <code className="text-xs bg-gray-100 px-1 rounded">email@domain.com</code> ·
          <code className="text-xs bg-gray-100 px-1 rounded ml-1">Nome Cognome &lt;email@domain.com&gt;</code> ·
          <code className="text-xs bg-gray-100 px-1 rounded ml-1">email, Nome, Azienda, Telefono</code>
        </p>
        <Textarea
          id="contacts-raw"
          rows={10}
          placeholder={"mario.rossi@example.com\nGiulia Bianchi <giulia@example.com>\npaolo@agency.it, Paolo Verdi, Agenzia Roma, +39 333 1234567"}
          value={raw}
          onChange={e => { setRaw(e.target.value); setParsed(false) }}
          className="font-mono text-sm"
        />
      </div>

      <Button variant="outline" onClick={handleParse} disabled={raw.trim().length === 0}>
        Analizza
      </Button>

      {parsed && rows.length > 0 && (
        <>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Nome</th>
                  <th className="text-left p-3 font-medium">Azienda</th>
                  <th className="text-left p-3 font-medium">Stato</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={`border-b last:border-0 ${!row.valid ? 'bg-red-50' : ''}`}>
                    <td className="p-3 font-mono text-xs">{row.email}</td>
                    <td className="p-3 text-xs">{row.name || '—'}</td>
                    <td className="p-3 text-xs">{row.company || '—'}</td>
                    <td className="p-3">
                      {!row.valid && <span className="text-red-600 text-xs">✗ email non valida</span>}
                      {row.valid && row.status === 'pending' && <span className="text-gray-400 text-xs">in attesa</span>}
                      {row.status === 'sending' && <span className="text-blue-600 text-xs animate-pulse">invio...</span>}
                      {row.status === 'ok' && <span className="text-green-600 text-xs">✓ inviato</span>}
                      {row.status === 'error' && (
                        <span className="flex items-center gap-2">
                          <span className="text-red-600 text-xs">✗ {row.message || 'errore'}</span>
                          {!sending && (
                            <button
                              onClick={() => retryRow(i)}
                              className="text-xs underline text-blue-600"
                            >
                              Riprova
                            </button>
                          )}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sending && (
            <p className="text-sm text-portal-muted">
              Invio {progress} di {validRows.length}...
            </p>
          )}

          <Button
            onClick={handleSend}
            disabled={sending || validRows.length === 0}
          >
            {sending ? `Invio in corso...` : `Invia a tutti (${validRows.length} validi)`}
          </Button>
        </>
      )}

      {parsed && rows.length === 0 && (
        <p className="text-sm text-portal-muted">Nessun contatto trovato. Controlla il formato.</p>
      )}
    </div>
  )
}

// ────────── Single Contact Tab ──────────

function SingleContactTab() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setStatus('error')
      setErrorMsg('Sessione scaduta. Effettua di nuovo il login.')
      return
    }

    const res = await fetch('/api/admin/import-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ email, name: name || undefined, company: company || undefined, phone: phone || undefined }),
    })

    const json = await res.json()

    if (json.status === 'ok') {
      setStatus('ok')
      toast({ title: 'Email inviata!', description: `Accesso inviato a ${email}` })
      setEmail(''); setName(''); setCompany(''); setPhone('')
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
      setErrorMsg(json.message || json.error || 'Errore sconosciuto')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="single-email">Email *</Label>
        <Input
          id="single-email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="mario@example.com"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="single-name">Nome</Label>
        <Input id="single-name" value={name} onChange={e => setName(e.target.value)} placeholder="Mario Rossi" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="single-company">Azienda</Label>
        <Input id="single-company" value={company} onChange={e => setCompany(e.target.value)} placeholder="Agenzia Roma" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="single-phone">Telefono</Label>
        <Input id="single-phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+39 333 1234567" className="mt-1" />
      </div>

      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Invio...' : 'Invia accesso'}
      </Button>

      {status === 'ok' && <p className="text-green-600 text-sm">✓ Email inviata!</p>}
      {status === 'error' && <p className="text-red-600 text-sm">✗ {errorMsg}</p>}
    </form>
  )
}
