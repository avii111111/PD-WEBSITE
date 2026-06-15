import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../components/AuthProvider';

const contactSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().min(2, "Required"),
  country: z.string().min(2, "Required"),
  jobTitle: z.string().min(2, "Required"),
  type: z.string().min(1, "Required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export function Contact() {
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setSuccess(true);
        reset();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="pt-12 pb-24 min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Contact Us</h1>
          <p className="text-lg text-slate-400">Have questions about our AI solutions? Our team is ready to help you formulate the perfect AI strategy.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/10 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold text-white mb-2">Our Headquarters</h3>
              <p className="text-slate-400 text-sm">Innovation Hub, Tech Park<br />Sunderland, United Kingdom</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/10 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold text-white mb-2">Email Us</h3>
              <p className="text-slate-400 text-sm">hello@ai-solutions.co.uk<br />support@ai-solutions.co.uk</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/10 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold text-white mb-2">Call Us</h3>
              <p className="text-slate-400 text-sm">+44 191 123 4567<br />Mon-Fri, 9am - 5pm GMT</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl border border-white/10">
              <h2 className="text-2xl font-display font-bold text-white mb-8">Send us a message</h2>
              {success ? (
                <div className="bg-green-500/10 text-green-300 p-8 rounded-xl border border-green-200 text-center">
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p>Thank you for reaching out. An AI specialist will contact you within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                      <input {...register('name')} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                      <input {...register('email')} type="email" className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                      <input {...register('phone')} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Company Name</label>
                      <input {...register('company')} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary" />
                      {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Country</label>
                      <input {...register('country')} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary" />
                      {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Job Title</label>
                      <input {...register('jobTitle')} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary" />
                      {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Inquiry Type</label>
                    <select {...register('type')} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary">
                      <option className="bg-[#020617]" value="">-- Select Type --</option>
                      <option className="bg-[#020617]" value="AI Assistant">AI Assistant</option>
                      <option className="bg-[#020617]" value="Software Solution">Software Solution</option>
                      <option className="bg-[#020617]" value="Prototype">Prototype</option>
                      <option className="bg-[#020617]" value="Demo Request">Demo Request</option>
                      <option className="bg-[#020617]" value="Event Information">Event Information</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                    <textarea {...register('message')} rows={4} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/90 transition border border-secondary/30 shadow-lg shadow-secondary/20-colors shadow-md">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
