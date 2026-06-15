import { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
}

const regSchema = z.object({
  eventId: z.string().min(1, "Select an event"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  country: z.string().min(2, "Country is required"),
});

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof regSchema>>({
    resolver: zodResolver(regSchema)
  });

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  const onSubmit = async (data: z.infer<typeof regSchema>) => {
    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, eventId: parseInt(data.eventId) })
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
    <div className="pt-12 pb-24 top-0">
      <div className="bg-transparent text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Upcoming AI Events</h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Join our masterclasses, workshops, and conferences to discover the future of enterprise AI.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-8">Event Calendar</h2>
          {loading ? (
             <div className="animate-pulse space-y-4">
               {[1,2].map(i => <div key={i} className="h-32 bg-white/5 rounded-xl"></div>)}
             </div>
          ) : (
            <div className="space-y-6">
              {events.map(ev => (
                <div key={ev.id} className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                  <h3 className="text-xl font-bold text-white mb-2">{ev.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{ev.description}</p>
                  <div className="flex items-center space-x-6 text-sm font-medium text-slate-400">
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-secondary" /> {ev.date}</div>
                    <div className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-secondary" /> {ev.location}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-display font-bold text-white mb-6">Join Our Events</h2>
            {success ? (
               <div className="bg-green-500/10 text-green-300 p-6 rounded-xl border border-green-200 text-center">
                 <h3 className="text-xl font-bold mb-2">Registration Successful!</h3>
                 <p>We've received your registration and will send details shortly.</p>
                 <button onClick={() => setSuccess(false)} className="mt-4 text-sm font-medium text-green-700 underline">Register for another event</button>
               </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Select Event</label>
                  <select {...register('eventId')} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary">
                    <option className="bg-[#020617]" value="">-- Choose an Event --</option>
                    {events.map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.title} - {ev.date}</option>
                    ))}
                  </select>
                  {errors.eventId && <p className="text-red-500 text-xs mt-1">{errors.eventId.message}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                    <input {...register('name')} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                    <input {...register('email')} type="email" className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Company</label>
                    <input {...register('company')} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Country</label>
                    <input {...register('country')} className="w-full bg-[#020617] text-white placeholder-slate-400 px-4 py-2 border border-white/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary" />
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                  </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full py-3 mt-4 bg-secondary text-white font-medium rounded-lg hover:bg-secondary/90 transition border border-secondary/30 shadow-lg shadow-secondary/20-colors flex items-center justify-center">
                  {isSubmitting ? 'Registering...' : 'Complete Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
