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
    let settled = false;

    const succeed = () => { if (!settled) { settled = true; setReady(true); } };
    const fail = async () => {
      if (!settled) {
        settled = true;
        await supabase.auth.signOut();
        setError(true);
      }
    };

    // Validate session server-side. Returns true if valid, false otherwise.
    const validate = async (session: Session | null, label: string): Promise<boolean> => {
      console.log(`[SetPassword] ${label} — session user:`, session?.user?.id ?? 'none');
      if (!session) { console.log(`[SetPassword] ${label} — no session`); return false; }
      const { data: { user }, error: getUserError } = await supabase.auth.getUser();
      console.log(`[SetPassword] ${label} getUser →`, user?.id ?? 'none', getUserError?.message ?? 'ok');
      return !!user && !getUserError;
    };

    // Check for OTP token in hash (email-scanner-resistant flow).
    // approve.ts emails a custom URL: /portal/set-password#otp=TOKEN&email=EMAIL
    // Hash fragments are never sent in HTTP requests, so email scanners can't
    // consume the one-time token — only real browser JS can read it.
    const hashParams = new URLSearchParams(initialHash.replace(/^#/, ''));
    const otpToken = hashParams.get('otp');
    const otpEmail = hashParams.get('email');
    const hasPendingOtp = !!(otpToken && otpEmail);

    // Also support old-style Supabase magic link hash (type=magiclink)
    const hasMagicLinkHash = initialHash.includes('type=magiclink');

    const hasAnyPendingAuth = hasPendingOtp || hasMagicLinkHash;
    console.log('[SetPassword] hasPendingOtp:', hasPendingOtp, 'hasMagicLinkHash:', hasMagicLinkHash);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[SetPassword] event:', event, 'settled:', settled);
      if (settled) return;

      if (event === 'SIGNED_IN') {
        // Definitive event — succeed or fail, no more waiting
        (await validate(session, 'SIGNED_IN')) ? succeed() : fail();
      } else if (event === 'INITIAL_SESSION') {
        if (await validate(session, 'INITIAL_SESSION')) {
          succeed();
        } else if (!hasAnyPendingAuth) {
          // No auth in flight — nothing is coming, fail now
          fail();
        }
        // else: auth exchange in progress → wait for SIGNED_IN
      }
    });

    // If hash has OTP token, verify it client-side to establish a session.
    // On success Supabase fires SIGNED_IN → onAuthStateChange handles it.
    if (hasPendingOtp) {
      console.log('[SetPassword] verifyOtp — email:', otpEmail);
      supabase.auth.verifyOtp({
        email: otpEmail!,
        token: otpToken!,
        type: 'magiclink',
      }).then(({ error: otpError }) => {
        if (otpError) {
          console.error('[SetPassword] verifyOtp error:', otpError.message);
          fail();
        }
        // On success: SIGNED_IN fires → onAuthStateChange calls succeed()
      });
    }

    // Safety timeout: if we're still loading after 12s, show error
    const timeout = setTimeout(() => {
      console.warn('[SetPassword] timeout — no valid session received');
      fail();
    }, 12000);

    return () => {
      settled = true;
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
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
