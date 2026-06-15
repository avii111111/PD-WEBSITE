import { motion } from 'motion/react';
import { ArrowRight, Bot, Cpu, Zap, LayoutDashboard, CheckCircle2, Building2, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 hidden"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-500/10 text-secondary mb-6 border border-blue-100">
                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
                Next-Gen Enterprise AI
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6">
                Build The Future With <span className="text-gradient">AI-Powered</span> Business Solutions
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                Transform your workplace with intelligent virtual assistants, automation, and custom AI solutions designed for modern enterprises.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/schedule-demo" className="px-8 py-4 bg-secondary text-white font-medium rounded-full hover:bg-secondary/90 transition border border-secondary/30 shadow-lg shadow-secondary/20-all flex items-center justify-center hover:shadow-xl hover:-translate-y-0.5">
                  Schedule A Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/services" className="px-8 py-4 bg-white/5 backdrop-blur-md text-white font-medium rounded-full border border-white/20 hover:border-white/20 hover:bg-transparent transition-all flex items-center justify-center">
                  Explore Solutions
                </Link>
              </div>
              
              <div className="mt-12 flex items-center space-x-6 text-sm text-slate-400 font-medium">
                <div className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2" /> No credit card required</div>
                <div className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2" /> 14-day free trial</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative lg:h-[600px] hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-accent/10 rounded-[2.5rem] transform rotate-3 scale-105 glass-dark opacity-20"></div>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col">
                <div className="h-12 border-b border-white/10 flex items-center px-4 space-x-2 bg-white/5">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center items-center relative overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent">
                   <motion.div 
                      animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 opacity-30 flex items-center justify-center"
                   >
                     <div className="h-[400px] w-[400px] rounded-full border border-secondary/30 border-dashed animate-[spin_60s_linear_infinite]"></div>
                     <div className="absolute h-[300px] w-[300px] rounded-full border border-accent/20 border-dotted animate-[spin_40s_linear_infinite_reverse]"></div>
                   </motion.div>
                   
                   <div className="glass-dark p-6 rounded-2xl w-full max-w-sm relative z-10 space-y-4">
                     <div className="h-4 w-24 bg-white/10 rounded-full mb-6 relative overflow-hidden">
                       <motion.div animate={{x: ['-100%', '200%']}} transition={{duration: 2, repeat: Infinity}} className="absolute inset-y-0 w-1/2 bg-white/20 blur-sm"></motion.div>
                     </div>
                     <div className="space-y-3">
                       {[60, 80, 40, 100].map((width, i) => (
                         <div key={i} className="flex items-center space-x-3">
                           <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                             <LayoutDashboard className="h-4 w-4 text-white" />
                           </div>
                           <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                             <motion.div initial={{ width: 0 }} animate={{ width: `${width}%` }} transition={{ duration: 1, delay: i * 0.2 + 0.5 }} className="h-full bg-secondary"></motion.div>
                           </div>
                         </div>
                       ))}
                     </div>
                     <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-white/50 text-xs font-mono">
                        <span>SYSTEM_ONLINE</span>
                        <span className="text-green-400 flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-1 animate-pulse"></span>ACTIVE</span>
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-10 border-y border-white/10 bg-transparent flex flex-col justify-center text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Trusted by innovative businesses worldwide</p>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
             <div className="flex flex-col items-center justify-center px-4">
               <div className="text-4xl font-display font-bold text-white mb-2">500+</div>
               <div className="text-sm text-slate-400 font-medium">Businesses Supported</div>
             </div>
             <div className="flex flex-col items-center justify-center px-4">
               <div className="text-4xl font-display font-bold text-white mb-2">1000+</div>
               <div className="text-sm text-slate-400 font-medium">AI Solutions Delivered</div>
             </div>
             <div className="flex flex-col items-center justify-center px-4">
               <div className="text-4xl font-display font-bold text-white mb-2">98%</div>
               <div className="text-sm text-slate-400 font-medium">Customer Satisfaction</div>
             </div>
             <div className="flex flex-col items-center justify-center px-4">
               <div className="text-4xl font-display font-bold text-white mb-2">24/7</div>
               <div className="text-sm text-slate-400 font-medium">AI Support</div>
             </div>
           </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Business Problems We Solve</h2>
            <p className="text-lg text-slate-400">We analyze your bottlenecks and deploy targeted AI solutions to accelerate your operations.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Slow Processes", desc: "Manual workflows reduce productivity and cause delays.", icon: Zap },
              { title: "Employee Support Issues", desc: "Employees need faster digital assistance.", icon: Users },
              { title: "Customer Service Challenges", desc: "Businesses need intelligent, scalable support.", icon: Bot },
              { title: "Innovation Barriers", desc: "Companies struggle to adopt and integrate AI.", icon: Cpu }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-transparent border border-white/10 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-white/5 backdrop-blur-md shadow-sm border border-white/10 flex items-center justify-center mb-6">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white/5 backdrop-blur-[2px] relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-ai opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Ready To Transform Your Business With AI?</h2>
          <p className="text-xl text-slate-300 mb-10">Join hundreds of innovative companies already leveraging AI-Solutions.</p>
          <Link to="/schedule-demo" className="inline-flex items-center px-8 py-4 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 transition-all border border-secondary/30 shadow-lg shadow-secondary/20">
            Book Your Free AI Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
