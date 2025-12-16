import { useEffect, useRef, useState } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import ExperienceCard from '@/components/portal/ExperienceCard';
import { mockExperiences } from '@/data/mockExperiences';
import { mockLocals } from '@/data/mockLocals';
import { mockSeasonal } from '@/data/mockSeasonal';
import { Heart, Menu } from 'lucide-react';
import LocalCard from '@/components/portal/LocalCard';
import SeasonalCard from '@/components/portal/SeasonalCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const WEBHOOK_URL =
    'https://automation.smarteer.it/webhook-test/5b125308-0ae6-4192-92eb-02947b761400';
  const submittedRef = useRef(false);

  const localCareItem = {
    id: 'local-care',
    title: 'Local Care',
    subtitle: '24/7 Remote Assistance',
    category: 'Local Services',
    description: 'Dedicated remote support for your clients in Italy with instant coordination and reliable local services.',
    longDescription: '',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/file_final_2.svg',
    gallery: [],
    duration: 'Instant support',
    location: 'Remote · Nationwide Coverage',
    groupSize: '—',
    included: [],
    availability: 'Available 24/7',
  };

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('ttl_wishlist') || '[]');
    setWishlistIds(wishlist);
  }, []);

  const wishlistExperiences = mockExperiences.filter((exp) => wishlistIds.includes(exp.id));
  const wishlistLocals = mockLocals.filter((loc) => wishlistIds.includes(loc.id));
  const wishlistSeasonal = mockSeasonal.filter((item) => wishlistIds.includes(item.id));
  const localCareInWishlist = wishlistIds.includes('local-care');
  const wishlistExperiencesCombined = localCareInWishlist
    ? [...wishlistExperiences, localCareItem as any]
    : wishlistExperiences;
  const hasItems =
    wishlistExperiences.length +
      wishlistLocals.length +
      wishlistSeasonal.length +
      (localCareInWishlist ? 1 : 0) >
    0;

  const handleClearAll = () => {
    localStorage.setItem('ttl_wishlist', JSON.stringify([]));
    setWishlistIds([]);
  };

  const handleRequestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    if (submittedRef.current) return;
    submittedRef.current = true;

    const requestedExperiences = wishlistExperiencesCombined.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      type: item.id === 'local-care' ? 'local_care' : 'experience',
    }));
    const requestedLocals = wishlistLocals.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      type: 'local',
    }));
    const requestedSeasonal = wishlistSeasonal.map((item) => ({
      id: item.id,
      title: item.title,
      season: item.season,
      type: 'seasonal',
    }));

    const webhookPayload = {
      ...payload,
      form_type: 'wishlist_request_form',
      wishlistIds,
      requestedItems: {
        experiences: requestedExperiences,
        locals: requestedLocals,
        seasonal: requestedSeasonal,
      },
    };

    try {
      void fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload),
        keepalive: true,
      })
        .catch((err) => {
          console.error('Wishlist webhook submission failed', err);
        })
        .finally(() => {
          submittedRef.current = false;
        });
    } catch (err) {
      console.error('Wishlist webhook payload build failed', err);
      submittedRef.current = false;
    }

    console.log('Wishlist request submitted', webhookPayload);
    e.currentTarget.reset();
    alert('Request sent. Our concierge will get back to you shortly.');
  };

  return (
    <div className="flex min-h-screen bg-portal-cream relative">
      <PortalSidebar isOpen={sidebarOpen} />
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
      
      <main className="flex-1 p-4 md:p-6 transition-all duration-300 md:ml-10">
        <div className="md:hidden mb-4 flex items-center justify-between">
          <button
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-portal-navy text-portal-cream"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-luxury text-4xl text-portal-navy mb-2">
              Your Wishlist
            </h1>
            <p className="text-foreground/60">
              Experiences you've saved for later
            </p>
          </div>
          {hasItems && (
            <Button
              onClick={handleClearAll}
              className="self-start md:self-center bg-portal-navy text-portal-cream hover:bg-portal-navy/90 rounded-full px-5 py-3 text-sm font-medium"
            >
              Clear All
            </Button>
          )}
        </div>

        {hasItems ? (
          <>
            <div className="bg-[#FAF7F2] border border-portal-navy/10 rounded-lg p-6 md:p-8 mb-10 max-w-5xl mx-auto w-full">
              <h2 className="font-luxury text-3xl text-portal-navy mb-2 text-center md:text-left">
                Request Saved Experiences
              </h2>
              <p className="text-foreground/70 mb-6 text-center md:text-left">
                Send a single request for everything you saved. Our concierge will coordinate the details.
              </p>
              <form onSubmit={handleRequestSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      className="w-28 border border-input bg-background text-sm rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-portal-navy/40"
                      defaultValue="+39"
                      required
                    >
                      <option value="+1">+1 (US/CA)</option>
                      <option value="+39">+39 (Italy)</option>
                      <option value="+33">+33 (France)</option>
                      <option value="+34">+34 (Spain)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+49">+49 (Germany)</option>
                      <option value="+41">+41 (Switzerland)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+61">+61 (Australia)</option>
                      <option value="+64">+64 (New Zealand)</option>
                      <option value="+81">+81 (Japan)</option>
                      <option value="+82">+82 (South Korea)</option>
                      <option value="+86">+86 (China)</option>
                      <option value="+852">+852 (Hong Kong)</option>
                      <option value="+853">+853 (Macau)</option>
                      <option value="+886">+886 (Taiwan)</option>
                      <option value="+91">+91 (India)</option>
                      <option value="+65">+65 (Singapore)</option>
                      <option value="+60">+60 (Malaysia)</option>
                      <option value="+62">+62 (Indonesia)</option>
                      <option value="+66">+66 (Thailand)</option>
                      <option value="+55">+55 (Brazil)</option>
                      <option value="+52">+52 (Mexico)</option>
                      <option value="+54">+54 (Argentina)</option>
                      <option value="+57">+57 (Colombia)</option>
                      <option value="+27">+27 (South Africa)</option>
                    </select>
                    <Input id="phone" name="phone" type="tel" className="flex-1" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input id="guests" name="guests" type="number" min="1" defaultValue={2} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" name="date" placeholder="gg/mm/aaaa" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupSpot">Pick Up Spot</Label>
                  <Input id="pickupSpot" name="pickupSpot" placeholder="e.g., Hotel Savoy, Florence" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoffSpot">Drop Off Spot</Label>
                  <Input id="dropoffSpot" name="dropoffSpot" placeholder="e.g., Piazza del Duomo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupTime">Pick Up Time</Label>
                  <Input id="pickupTime" name="pickupTime" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoffTime">Drop Off Time</Label>
                  <Input id="dropoffTime" name="dropoffTime" type="time" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Additional Notes or Preferences</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special requests, dietary restrictions, or preferences..."
                    rows={4}
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-portal-navy text-portal-cream hover:bg-portal-navy/90 px-6 py-3 rounded-full"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>

            {wishlistExperiencesCombined.length > 0 && (
              <>
                <h2 className="font-luxury text-3xl text-portal-navy mb-4">Experiences</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {wishlistExperiencesCombined.map((experience) => (
                    <ExperienceCard
                      key={experience.id}
                      experience={experience as any}
                      linkTo={experience.id === 'local-care' ? '/portal/local-care' : undefined}
                    />
                  ))}
                </div>
              </>
            )}

            {wishlistLocals.length > 0 && (
              <>
                <h2 className="font-luxury text-3xl text-portal-navy mb-4">Locals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {wishlistLocals.map((local) => (
                    <div key={local.id} className="w-full max-w-md md:max-w-full">
                      <LocalCard local={local} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {wishlistSeasonal.length > 0 && (
              <>
                <h2 className="font-luxury text-3xl text-portal-navy mb-4">Seasonal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistSeasonal.map((item) => (
                    <SeasonalCard key={item.id} experience={item} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-foreground/40" />
            </div>
            <h2 className="font-luxury text-2xl text-portal-navy mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-foreground/60 mb-6">
              Start exploring and save experiences you love
            </p>
            <a
              href="/portal/experiences"
              className="px-6 py-3 bg-portal-gold text-portal-navy rounded-md hover:bg-portal-gold/90 transition-colors font-medium"
            >
              Browse Experiences
            </a>
          </div>
        )}
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Wishlist;
