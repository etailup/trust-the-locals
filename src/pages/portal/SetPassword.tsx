import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for Supabase to process the magic link hash and establish a session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setReady(true);
      }
    });

    // Also check if there's already a session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
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
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success('Password set successfully! Welcome.');
    navigate('/portal/experiences');
  };

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
