import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Instagram } from "lucide-react";
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
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Contact form submitted:", values);
      toast.success("Message sent successfully! We'll be in touch soon.");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <section id="contact" className="bg-portal-cream pt-40 pb-20 sm:pt-48 sm:pb-28 md:pt-56 md:pb-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="font-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-portal-navy mb-4 sm:mb-6">
            Get in Touch
          </h2>
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-12 sm:w-16 h-px bg-portal-navy/40"></div>
          </div>
          <p className="font-body text-base sm:text-lg text-portal-navy/70 max-w-2xl mx-auto px-4">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="font-luxury text-2xl sm:text-3xl text-portal-navy mb-6 sm:mb-8">
                Contact Information
              </h3>
              
              <div className="space-y-5 sm:space-y-6">
                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-full border-2 border-portal-navy/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-portal-navy" />
                  </div>
                  <div>
                    <p className="font-body text-xs sm:text-sm text-portal-navy/60 mb-1 tracking-wide uppercase">
                      Email
                    </p>
                    <a 
                      href="mailto:info@trusthelocals.com"
                      className="font-body text-base sm:text-lg text-portal-navy hover:text-portal-navy/70 transition-colors break-all"
                    >
                      info@trusthelocals.com
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-full border-2 border-portal-navy/20 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-portal-navy" />
                  </div>
                  <div>
                    <p className="font-body text-xs sm:text-sm text-portal-navy/60 mb-1 tracking-wide uppercase">
                      Instagram
                    </p>
                    <a 
                      href="https://instagram.com/trusthelocals"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-base sm:text-lg text-portal-navy hover:text-portal-navy/70 transition-colors"
                    >
                      @trusthelocals
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tagline & Response Time */}
            <div className="border-l-2 border-portal-navy/20 pl-4 sm:pl-6 space-y-4 sm:space-y-6 mt-8 sm:mt-12">
              <p className="font-luxury text-xl sm:text-2xl text-portal-navy italic leading-relaxed">
                "Don't trust anyone, trust the locals."
              </p>
              <p className="font-body text-sm sm:text-base text-portal-navy/60">
                We typically respond within 24 hours during business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-portal-navy/10 rounded-sm p-6 sm:p-8 shadow-sm" style={{ backgroundColor: '#FAF7F2' }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        Name <span className="text-red-500">*</span>
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

                {/* Subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        Subject <span className="text-red-500">*</span>
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

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-portal-navy">
                        Message <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          rows={5}
                          className="border-portal-navy/20 focus:border-portal-navy resize-none"
                        />
                      </FormControl>
                      <FormMessage />
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
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
