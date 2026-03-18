import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, initialHash } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndSetReady = async (session: Session | null) => {
      console.log('[SetPassword] checkAndSetReady — session user id:', session?.user?.id ?? 'none');
      if (!session) return;
      const { data: { user }, error: getUserError } = await supabase.auth.getUser();
      console.log('[SetPassword] getUser result — id:', user?.id ?? 'none', 'error:', getUserError?.message ?? 'none');
      if (user && !getUserError) {
        setReady(true);
      } else {
        console.warn('[SetPassword] stale/invalid session, signing out');
        await supabase.auth.signOut();
        setError(true);
      }
    };

    // If the page loaded with a magic link hash, skip INITIAL_SESSION — it fires
    // with the stale localStorage session BEFORE the hash is processed. Wait for
    // SIGNED_IN which fires after Supabase exchanges the OTP for a real session.
    const hasMagicLinkHash = initialHash.includes('type=magiclink');

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[SetPassword] onAuthStateChange event:', event, 'session user id:', session?.user?.id ?? 'none');
      if (event === 'SIGNED_IN') {
        checkAndSetReady(session);
      } else if (event === 'INITIAL_SESSION' && !hasMagicLinkHash) {
        // Only validate an existing session if we weren't redirected via magic link
        checkAndSetReady(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    console.log('[SetPassword] updateUser — current session user id:', currentSession?.user?.id ?? 'none');
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error('[SetPassword] updateUser error:', error.message);
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success('Password set successfully! Welcome.');
    navigate('/portal/experiences');
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-portal-cream px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="font-luxury text-2xl text-portal-navy mb-4">Link non valido</h1>
          <p className="font-body text-portal-navy/60 text-sm mb-6">
            Il link è scaduto o non valido. Per favore richiedi un nuovo link di accesso.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-portal-navy hover:bg-portal-navy/90 font-body tracking-[0.15em] uppercase py-5 min-h-[44px]"
            style={{ color: '#FAF7F2' }}
          >
            Torna alla home
          </Button>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-portal-cream">
        <p className="font-body text-portal-navy/60">Setting up your account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-portal-cream px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-luxury text-3xl text-portal-navy mb-2">Set Your Password</h1>
          <div className="w-12 h-px bg-portal-navy/40 mx-auto mb-4"></div>
          <p className="font-body text-portal-navy/60 text-sm">
            Create a password to access the portal on future visits.
          </p>
        </div>

        <div className="bg-white border border-portal-navy/10 rounded-sm p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="font-body text-portal-navy">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="border-portal-navy/20 focus:border-portal-navy"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="font-body text-portal-navy">Confirm Password</Label>
              <Input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat password"
                className="border-portal-navy/20 focus:border-portal-navy"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-portal-navy hover:bg-portal-navy/90 font-body tracking-[0.15em] uppercase py-5 min-h-[44px]"
              style={{ color: '#FAF7F2' }}
            >
              {loading ? 'Saving...' : 'Set Password & Enter Portal'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
