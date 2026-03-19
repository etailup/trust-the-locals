import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import PortalSidebar from '@/components/portal/PortalSidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import * as XLSX from 'xlsx'

// ────────── Types ──────────

type ContactType = 'agency' | 'private' | 'hotel' | ''

const CONTACT_TYPES: { value: ContactType; label: string }[] = [
  { value: 'agency', label: 'Agency' },
  { value: 'private', label: 'Private' },
  { value: 'hotel', label: 'Hotel' },
]

const ANNUAL_CLIENTS_OPTIONS = [
  '1-10 clients per year',
  '11-25 clients per year',
  '26-50 clients per year',
  '51-100 clients per year',
  '100+ clients per year',
]

// ────────── Parser ──────────
// CSV column order: email, name, company, phone, type, country, website, linkedin_url, annual_clients

interface ParsedContact {
  email: string
  name?: string
  company?: string
  phone?: string
  type?: string
  country?: string
  website?: string
  linkedin_url?: string
  annual_clients?: string
  valid: boolean
}

// Header aliases (case-insensitive) → normalized key
const HEADER_MAP: Record<string, keyof ParsedContact> = {
  email: 'email', 'e-mail': 'email',
  name: 'name', nome: 'name', 'contact name': 'name', 'nome contatto': 'name',
  company: 'company', azienda: 'company', agency: 'company', 'agency name': 'company',
  phone: 'phone', telefono: 'phone', tel: 'phone',
  type: 'type', tipo: 'type',
  country: 'country', paese: 'country',
  website: 'website', sito: 'website', 'sito web': 'website',
  linkedin: 'linkedin_url', 'linkedin url': 'linkedin_url', linkedin_url: 'linkedin_url',
  'annual clients': 'annual_clients', 'clienti annui': 'annual_clients', annual_clients: 'annual_clients',
}

function parseContacts(raw: string): ParsedContact[] {
  const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0)
  if (lines.length === 0) return []

  // Detect if first line is a header row (no @ sign in first cell)
  const firstCell = lines[0].split(',')[0].trim()
  const hasHeader = !firstCell.includes('@') && !firstCell.includes('<')

  let headerKeys: (keyof ParsedContact | null)[] = []
  let dataLines = lines

  if (hasHeader) {
    const headerCells = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''))
    headerKeys = headerCells.map(h => HEADER_MAP[h] ?? null)
    dataLines = lines.slice(1)
  }

  return dataLines.map(line => {
    // Format: "First Last <email@domain.com>"
    const angleMatch = line.match(/^(.+?)\s*<([^>]+)>$/)
    if (angleMatch) {
      const name = angleMatch[1].trim()
      const email = angleMatch[2].trim()
      return { email, name, valid: isValidEmail(email) }
    }

    // CSV — positional or header-mapped
    if (line.includes(',')) {
      const parts = line.split(',').map(p => p.trim().replace(/^["']|["']$/g, ''))

      if (hasHeader && headerKeys.length > 0) {
        const contact: Partial<ParsedContact> = { valid: false }
        headerKeys.forEach((key, i) => {
          if (key && parts[i]) contact[key] = parts[i] as never
        })
        contact.valid = isValidEmail(contact.email ?? '')
        return contact as ParsedContact
      }

      // Positional: email, name, company, phone, type, country, website, linkedin_url, annual_clients
      return {
        email: parts[0] ?? '',
        name: parts[1] || undefined,
        company: parts[2] || undefined,
        phone: parts[3] || undefined,
        type: parts[4] || undefined,
        country: parts[5] || undefined,
        website: parts[6] || undefined,
        linkedin_url: parts[7] || undefined,
        annual_clients: parts[8] || undefined,
        valid: isValidEmail(parts[0] ?? ''),
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
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleParse = useCallback(() => {
    const contacts = parseContacts(raw)
    setRows(contacts.map(c => ({ ...c, status: 'pending' })))
    setParsed(true)
  }, [raw])

  const loadFile = useCallback((file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase()

    if (ext === 'csv' || ext === 'txt') {
      const reader = new FileReader()
      reader.onload = e => {
        const text = e.target?.result as string
        setRaw(text)
        setParsed(false)
      }
      reader.readAsText(file)
      return
    }

    if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader()
      reader.onload = e => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const wb = XLSX.read(data, { type: 'array' })
        const ws = wb.Sheets[wb.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 })
        // Convert to CSV-like text: each row joined by comma
        const text = rows
          .filter((r): r is string[] => Array.isArray(r) && r.length > 0)
          .map(r => r.join(', '))
          .join('\n')
        setRaw(text)
        setParsed(false)
      }
      reader.readAsArrayBuffer(file)
      return
    }

    toast({ title: 'Formato non supportato', description: 'Usa file .csv, .xlsx o .xls', variant: 'destructive' })
  }, [toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) loadFile(file)
  }

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
            type: row.type,
            country: row.country,
            website: row.website,
            linkedin_url: row.linkedin_url,
            annual_clients: row.annual_clients,
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
      body: JSON.stringify({
        email: row.email, name: row.name, company: row.company, phone: row.phone,
        type: row.type, country: row.country, website: row.website,
        linkedin_url: row.linkedin_url, annual_clients: row.annual_clients,
      }),
    })
    const json = await res.json()

    setRows(prev => prev.map((r, idx) =>
      idx === index
        ? { ...r, status: json.status === 'ok' ? 'ok' : 'error', message: json.message }
        : r
    ))
  }

  const downloadTemplate = () => {
    const rows = [
      ['email', 'nome', 'azienda', 'telefono', 'tipo', 'paese', 'website', 'linkedin_url', 'clienti_annui'],
      ['mario.rossi@agenziaroma.it', 'Mario Rossi', 'Agenzia Roma', '+39 06 1234567', 'agency', 'Italy', 'agenziaroma.it', 'linkedin.com/in/mario-rossi', '26-50 clients per year'],
      ['giulia.bianchi@grandhotel.it', 'Giulia Bianchi', 'Grand Hotel Firenze', '+39 055 9876543', 'hotel', 'Italy', 'grandhotelfirenze.com', '', ''],
      ['john.smith@luxurytravel.com', 'John Smith', 'Luxury Travel Co', '+1 212 5550100', 'agency', 'United States', 'luxurytravel.com', 'linkedin.com/in/john-smith', '51-100 clients per year'],
      ['sophie.martin@voyages.fr', 'Sophie Martin', '', '+33 1 23456789', 'private', 'France', '', '', '1-10 clients per year'],
    ]
    const csv = rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trust-the-locals-import-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* File drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragging ? 'border-portal-dark bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <p className="text-sm text-portal-muted">
          Trascina qui un file <strong>.csv</strong> o <strong>.xlsx</strong>, oppure <span className="underline">clicca per scegliere</span>
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls,.txt"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <button
          type="button"
          onClick={e => { e.stopPropagation(); downloadTemplate() }}
          className="text-xs text-portal-muted underline hover:text-portal-dark"
        >
          Scarica template CSV
        </button>
      </div>

      <div>
        <Label htmlFor="contacts-raw" className="text-sm font-medium mb-2 block">
          Oppure incolla la lista di contatti
        </Label>
        <p className="text-sm text-portal-muted mb-2">
          Colonne CSV (con o senza header): <code className="text-xs bg-gray-100 px-1 rounded">email, nome, azienda, telefono, tipo, paese, website, linkedin, clienti_annui</code><br />
          Tipo valori: <code className="text-xs bg-gray-100 px-1 rounded">agency</code> · <code className="text-xs bg-gray-100 px-1 rounded">private</code> · <code className="text-xs bg-gray-100 px-1 rounded">hotel</code>
        </p>
        <Textarea
          id="contacts-raw"
          rows={8}
          placeholder={"email, nome, azienda, telefono, tipo, paese, website, linkedin, clienti_annui\nmario@example.com, Mario Rossi, Agenzia Roma, +39 333 1234567, agency, Italy, agenziaroma.it, , 11-25 clients per year\ngiulia@hotel.it, Giulia Bianchi, Grand Hotel, +39 055 000000, hotel, Italy"}
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
          <div className="border rounded-md overflow-auto">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Nome</th>
                  <th className="text-left p-3 font-medium">Azienda</th>
                  <th className="text-left p-3 font-medium">Tipo</th>
                  <th className="text-left p-3 font-medium">Paese</th>
                  <th className="text-left p-3 font-medium">Stato</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={`border-b last:border-0 ${!row.valid ? 'bg-red-50' : ''}`}>
                    <td className="p-3 font-mono text-xs">{row.email}</td>
                    <td className="p-3 text-xs">{row.name || '—'}</td>
                    <td className="p-3 text-xs">{row.company || '—'}</td>
                    <td className="p-3 text-xs">{row.type || '—'}</td>
                    <td className="p-3 text-xs">{row.country || '—'}</td>
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
  const [type, setType] = useState<ContactType>('')
  const [country, setCountry] = useState('')
  const [website, setWebsite] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [annualClients, setAnnualClients] = useState('')
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
      body: JSON.stringify({
        email,
        name: name || undefined,
        company: company || undefined,
        phone: phone || undefined,
        type: type || undefined,
        country: country || undefined,
        website: website || undefined,
        linkedin_url: linkedinUrl || undefined,
        annual_clients: annualClients || undefined,
      }),
    })

    const json = await res.json()

    if (json.status === 'ok') {
      setStatus('ok')
      toast({ title: 'Email inviata!', description: `Accesso inviato a ${email}` })
      setEmail(''); setName(''); setCompany(''); setPhone('')
      setType(''); setCountry(''); setWebsite(''); setLinkedinUrl(''); setAnnualClients('')
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
        <Label htmlFor="single-type">Tipo</Label>
        <Select value={type} onValueChange={v => setType(v as ContactType)}>
          <SelectTrigger id="single-type" className="mt-1">
            <SelectValue placeholder="Seleziona tipo..." />
          </SelectTrigger>
          <SelectContent>
            {CONTACT_TYPES.map(ct => (
              <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="single-company">Azienda / Struttura</Label>
        <Input id="single-company" value={company} onChange={e => setCompany(e.target.value)} placeholder="Agenzia Roma" className="mt-1" />
      </div>

      <div>
        <Label htmlFor="single-phone">Telefono</Label>
        <Input id="single-phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+39 333 1234567" className="mt-1" />
      </div>

      <div>
        <Label htmlFor="single-country">Paese</Label>
        <Input id="single-country" value={country} onChange={e => setCountry(e.target.value)} placeholder="Italy" className="mt-1" />
      </div>

      <div>
        <Label htmlFor="single-website">Website</Label>
        <Input id="single-website" value={website} onChange={e => setWebsite(e.target.value)} placeholder="agenzia.com" className="mt-1" />
      </div>

      <div>
        <Label htmlFor="single-linkedin">LinkedIn URL</Label>
        <Input id="single-linkedin" value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} placeholder="linkedin.com/in/mario" className="mt-1" />
      </div>

      <div>
        <Label htmlFor="single-annual">Clienti annui (Toscana)</Label>
        <Select value={annualClients} onValueChange={setAnnualClients}>
          <SelectTrigger id="single-annual" className="mt-1">
            <SelectValue placeholder="Seleziona volume..." />
          </SelectTrigger>
          <SelectContent>
            {ANNUAL_CLIENTS_OPTIONS.map(opt => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Invio...' : 'Invia accesso'}
      </Button>

      {status === 'ok' && <p className="text-green-600 text-sm">✓ Email inviata!</p>}
      {status === 'error' && <p className="text-red-600 text-sm">✗ {errorMsg}</p>}
    </form>
  )
}
