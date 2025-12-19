import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  agencyName: z.string().trim().min(1, "Agency name is required").max(100),
  contactName: z.string().trim().min(1, "Contact name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  countryCode: z.string().default("+39"),
  website: z.string().trim().max(255).optional(),
  country: z.string().min(1, "Country is required"),
  linkedinUrl: z.string().trim().max(255).optional(),
  annualClients: z.string().min(1, "Please select client volume"),
  description: z.string().trim().min(50, "Please provide at least 50 characters").max(1000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
});

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Italy", "Spain", "Netherlands", "Switzerland", "Austria",
  "Belgium", "Denmark", "Norway", "Sweden", "Ireland", "Other"
];

const countryCodes = [
  { code: "+39", country: "Italy" },
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+34", country: "Spain" },
];

const clientVolumes = [
  "1-10 clients per year",
  "11-25 clients per year",
  "26-50 clients per year",
  "51-100 clients per year",
  "100+ clients per year"
];

const Apply = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const WEBHOOK_PROXY_URL = '/api/webhook-apply';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agencyName: "",
      contactName: "",
      email: "",
      phone: "",
      countryCode: "+39",
      website: "",
      country: "",
      linkedinUrl: "",
      annualClients: "",
      description: "",
      consent: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
        ...values,
        form_type: 'apply_form',
      };

      const res = await fetch(WEBHOOK_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      const bodyText = await res.text();
      console.log('Apply webhook response', res.status, res.ok, bodyText);

      if (!res.ok) {
        throw new Error(bodyText || `Apply webhook failed with status ${res.status}`);
      }

      toast.success("Application submitted successfully! We'll be in touch soon.");
      form.reset();
    } catch (err) {
      console.error('Apply webhook submission failed', err);
      toast.error("We couldn't submit your application right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-portal-cream">
      <Header />
      
      <main className="pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
          {/* Back Button */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-portal-navy/70 hover:text-portal-navy transition-colors mb-6 sm:mb-8 font-body min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="font-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-portal-navy mb-3 sm:mb-4 px-4">
              Apply as a Travel Agency
            </h1>
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-12 sm:w-16 h-px bg-portal-navy/40"></div>
            </div>
            <p className="font-body text-base sm:text-lg text-portal-navy/70 max-w-2xl mx-auto px-4">
              Join our network and start offering authentic Tuscan experiences to your clients.
            </p>
          </div>

          {/* Form */}
          <div className="border border-portal-navy/10 rounded-sm p-6 sm:p-8 md:p-12 shadow-sm" style={{ backgroundColor: '#FAF7F2' }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Agency Name */}
                <FormField
                  control={form.control}
                  name="agencyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        Agency Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="border-portal-navy/20 focus:border-portal-navy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contact Name */}
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        Contact Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="border-portal-navy/20 focus:border-portal-navy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="email"
                          className="border-portal-navy/20 focus:border-portal-navy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone with Country Code */}
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel className="font-body text-portal-navy">
                          Country Code <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-portal-navy/20">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countryCodes.map((cc) => (
                              <SelectItem key={cc.code} value={cc.code}>
                                {cc.code} {cc.country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="font-body text-portal-navy">
                          Phone <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            type="tel"
                            className="border-portal-navy/20 focus:border-portal-navy"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Website */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        Website
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="text"
                          placeholder="e.g. trusthelocals.com"
                          className="border-portal-navy/20 focus:border-portal-navy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        Country <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-portal-navy/20">
                            <SelectValue placeholder="Select country..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LinkedIn URL */}
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        LinkedIn URL (optional)
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="text"
                          placeholder="e.g. linkedin.com/in/yourprofile"
                          className="border-portal-navy/20 focus:border-portal-navy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Annual Clients */}
                <FormField
                  control={form.control}
                  name="annualClients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        Estimated Annual Tuscany Clients <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-portal-navy/20">
                            <SelectValue placeholder="Select volume..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clientVolumes.map((volume) => (
                            <SelectItem key={volume} value={volume}>
                              {volume}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        Tell us about your agency and why you'd like to partner with us{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          rows={6}
                          className="border-portal-navy/20 focus:border-portal-navy resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
              />

              {/* Consent */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mt-1 h-5 w-5 border-portal-navy/30 text-portal-navy focus:ring-portal-navy"
                      />
                    </FormControl>
                    <div className="space-y-1 pt-0.5">
                      <FormLabel className="font-body text-portal-navy leading-snug">
                        I consent to the processing of my personal data according to the Privacy Policy.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-portal-navy hover:bg-portal-navy/90 font-body text-sm sm:text-base tracking-[0.15em] sm:tracking-[0.2em] py-5 sm:py-6 uppercase transition-all duration-300 min-h-[44px]"
                  style={{ color: '#FAF7F2' }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Apply;
