import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    company: user?.company || '',
    phone: user?.phone || '',
    preferences: user?.preferences || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        name: formData.name,
        company: formData.company || null,
        phone: formData.phone || null,
        preferences: formData.preferences || null,
      })
      .eq('id', user.id);

    setSaving(false);

    if (error) {
      toast.error('Failed to save changes');
      return;
    }

    setUser({ ...user, ...formData });
    toast.success('Profile updated successfully!');
  };

  const memberSince = user?.memberSince
    ? new Date(user.memberSince).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : '—';

  return (
    <div className="flex min-h-screen bg-portal-cream">
      <PortalSidebar />

      <main className="md:ml-10 flex-1 p-8">
        <div className="max-w-3xl mx-auto px-3 md:px-0">
          <h1 className="font-luxury text-4xl text-portal-navy mb-2">
            Your Profile
          </h1>
          <p className="text-foreground/60 mb-8">
            Manage your account information and preferences
          </p>

          <div className="bg-white border border-border rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label htmlFor="company">Company / Agency Name</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your company or agency name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted/50 cursor-not-allowed"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+39 ..."
                />
              </div>

              <div>
                <Label htmlFor="preferences">Travel Themes & Preferences</Label>
                <Textarea
                  id="preferences"
                  rows={4}
                  value={formData.preferences}
                  onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                  placeholder="Tell us about your preferences: luxury dining, wellness, art & culture, outdoor adventures..."
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-portal-gold text-portal-navy hover:bg-portal-gold/90 font-medium"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 p-6 bg-white border border-border rounded-lg">
            <h3 className="font-luxury text-lg text-portal-navy mb-3">Account Information</h3>
            <div className="space-y-2 text-sm text-foreground/70">
              <p><strong className="text-portal-navy">Account Type:</strong> Premium Access</p>
              <p><strong className="text-portal-navy">Member Since:</strong> {memberSince}</p>
              <p><strong className="text-portal-navy">Status:</strong> Active</p>
            </div>
          </div>
        </div>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Profile;
