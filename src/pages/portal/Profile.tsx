import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    company: user?.company || '',
    email: user?.email || '',
    phone: user?.phone || '',
    preferences: user?.preferences || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+39 351 3628747"
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
                  className="bg-portal-gold text-portal-navy hover:bg-portal-gold/90 font-medium"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-white border border-border rounded-lg">
            <h3 className="font-luxury text-lg text-portal-navy mb-3">Account Information</h3>
            <div className="space-y-2 text-sm text-foreground/70">
              <p><strong className="text-portal-navy">Account Type:</strong> Premium Access</p>
              <p><strong className="text-portal-navy">Member Since:</strong> January 2025</p>
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
