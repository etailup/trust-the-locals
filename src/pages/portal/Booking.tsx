import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import { mockExperiences } from '@/data/mockExperiences';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = mockExperiences.find((exp) => exp.id === id);
  const WEBHOOK_PROXY_URL = '/api/webhook';
  const submittedRef = useRef(false);
  const transferIncludedExperiences = ['prem-3', 'fw-3', 'fw-10']; // Panoramic Escape, Wine Tour, Supercar Grand Tour
  const transferIncluded = experience ? transferIncludedExperiences.includes(experience.id) : false;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+39',
    phone: '',
    guests: '2',
    date: '',
    transfer: 'No',
    pickUpTime: '',
    dropOffTime: '',
    pickUpSpot: '',
    dropOffSpot: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submittedRef.current) return;
    submittedRef.current = true;

    try {
      const payload = {
        form_type: 'experience_request_form',
        experienceName: experience?.title,
        ...formData,
        transferIncluded,
      };

      console.log('Experience request payload', payload);

      void fetch(WEBHOOK_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      })
        .catch((err) => {
          console.error('Booking webhook submission failed', err);
        })
        .finally(() => {
          submittedRef.current = false;
        });
    } catch (err) {
      console.error('Booking webhook payload build failed', err);
      submittedRef.current = false;
    }

    toast.success('Your request has been sent! Our concierge team will contact you shortly.');
    navigate('/portal/dashboard');
  };

  if (!experience) {
    return (
      <div className="flex min-h-screen bg-portal-cream">
        <PortalSidebar />
        <main className="md:ml-10 flex-1 p-8">
          <p>Experience not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-portal-cream">
      <PortalSidebar />
      
      <main className="md:ml-10 flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-0">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mb-6 bg-portal-navy text-portal-cream hover:bg-portal-navy/90 border-none rounded-full px-5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="max-w-4xl">
            <h1 className="font-luxury text-4xl sm:text-5xl md:text-6xl text-portal-navy mb-4 leading-tight">
              Request Experience
            </h1>
            <p className="text-foreground/70 text-lg md:text-2xl mb-10 leading-relaxed">
              {experience.title} - {experience.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 bg-[#FAF7F2] border border-border rounded-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-lg text-portal-navy">First Name</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-lg text-portal-navy">Last Name</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-lg text-portal-navy">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="text-lg"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-lg text-portal-navy">Phone</Label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      className="w-28 sm:w-32 border border-input bg-background text-lg rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-portal-navy/40"
                      value={formData.countryCode}
                      onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
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
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="text-lg flex-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guests" className="text-lg text-portal-navy">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      required
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date" className="text-lg text-portal-navy">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="text-lg"
                    />
                  </div>
                </div>

                {!transferIncluded && (
                  <div>
                    <Label htmlFor="transfer" className="text-lg text-portal-navy">Transfer</Label>
                    <select
                      id="transfer"
                      value={formData.transfer}
                      onChange={(e) => setFormData({ ...formData, transfer: e.target.value })}
                      className="w-full text-lg mt-1 border border-input rounded-md px-3 py-2 bg-[#FAF7F2] text-portal-navy focus:outline-none focus:ring-2 focus:ring-portal-navy/30"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                )}

                {transferIncluded || formData.transfer === 'Yes' ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickUpSpot" className="text-lg text-portal-navy">Pick Up Spot</Label>
                        <Input
                          id="pickUpSpot"
                          type="text"
                          required
                          value={formData.pickUpSpot}
                          onChange={(e) => setFormData({ ...formData, pickUpSpot: e.target.value })}
                          className="text-lg"
                          placeholder="e.g., Hotel Savoy, Florence"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dropOffSpot" className="text-lg text-portal-navy">Drop Off Spot</Label>
                        <Input
                          id="dropOffSpot"
                          type="text"
                          required
                          value={formData.dropOffSpot}
                          onChange={(e) => setFormData({ ...formData, dropOffSpot: e.target.value })}
                          className="text-lg"
                          placeholder="e.g., Piazza del Duomo"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickUpTime" className="text-lg text-portal-navy">Pick Up Time</Label>
                        <Input
                          id="pickUpTime"
                          type="time"
                          required
                          value={formData.pickUpTime}
                          onChange={(e) => setFormData({ ...formData, pickUpTime: e.target.value })}
                          className="text-lg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dropOffTime" className="text-lg text-portal-navy">Drop Off Time</Label>
                        <Input
                          id="dropOffTime"
                          type="time"
                          required
                          value={formData.dropOffTime}
                          onChange={(e) => setFormData({ ...formData, dropOffTime: e.target.value })}
                          className="text-lg"
                        />
                      </div>
                    </div>
                  </>
                ) : null}

                <div>
                  <Label htmlFor="notes" className="text-lg text-portal-navy">Additional Notes or Preferences</Label>
                  <Textarea
                    id="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special requests, dietary restrictions, or preferences..."
                    className="text-lg"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-portal-navy text-portal-cream hover:bg-portal-navy/90 font-medium h-12 text-xl"
                >
                  Submit Request
                </Button>
              </form>
            </div>

            {/* Summary */}
            <div className="bg-[#FAF7F2] border border-border rounded-lg p-6 h-fit md:sticky md:top-8">
              <h3 className="font-luxury text-3xl text-portal-navy mb-4">Summary</h3>
              
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-32 object-cover rounded-md mb-4"
              />

              <div className="space-y-3 text-lg">
                <p className="text-foreground/70">
                  <strong className="text-portal-navy">Experience:</strong><br />
                  {experience.title}
                </p>
                <p className="text-foreground/70">
                  <strong className="text-portal-navy">Duration:</strong><br />
                  {experience.duration}
                </p>
                <p className="text-foreground/70">
                  <strong className="text-portal-navy">Location:</strong><br />
                  {experience.location}
                </p>
              </div>

              <div className="mt-6 p-4 bg-portal-light rounded-md">
                <p className="text-base text-foreground/70">
                  <strong className="text-portal-navy">Note:</strong> This is a request form. Our concierge team will contact you within 24 hours to confirm availability and provide pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Booking;
