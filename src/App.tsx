import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Bot, Menu, X, ChevronRight, Github, Twitter, Linkedin } from 'lucide-react';
import { cn } from './lib/utils';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { CaseStudies } from './pages/CaseStudies';
import { Events } from './pages/Events';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { ScheduleDemo } from './pages/ScheduleDemo';
import { AdminDashboard } from './pages/AdminDashboard';
import { AIChatAssistant } from './components/AIChatAssistant';
import { AuthProvider } from './components/AuthProvider';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Events', path: '/events' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-tr from-secondary to-accent text-white p-2 rounded-lg">
              <Bot className="h-6 w-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">AI-Solutions</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  location.pathname === link.path ? "text-white font-bold" : "text-slate-400"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/schedule-demo"
              className="px-5 py-2.5 bg-secondary text-white text-sm font-semibold rounded-full hover:bg-secondary/90 transition-all border border-secondary/30 shadow-lg shadow-secondary/20 flex items-center group"
            >
              Schedule Demo
              <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/5 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/schedule-demo"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-5 py-3 bg-secondary text-white text-base font-semibold rounded-lg hover:bg-secondary/90 shadow-lg shadow-secondary/20 border border-secondary/30"
              >
                Schedule Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 text-white pt-16 pb-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-tr from-secondary to-accent text-white p-2 rounded-lg">
                <Bot className="h-6 w-6" />
              </div>
              <span className="font-bold text-2xl tracking-tight">AI-Solutions</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-6">
              To innovate, promote, and deliver the future of digital employee experience by supporting people at work through Artificial Intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="h-5 w-5 text-slate-400 hover:text-white" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="h-5 w-5 text-slate-400 hover:text-white" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Github className="h-5 w-5 text-slate-400 hover:text-white" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-6">Solutions</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-slate-500 hover:text-white transition-colors">Virtual Assistants</Link></li>
              <li><Link to="/services" className="text-slate-500 hover:text-white transition-colors">Custom AI Software</Link></li>
              <li><Link to="/services" className="text-slate-500 hover:text-white transition-colors">Rapid Prototyping</Link></li>
              <li><Link to="/services" className="text-slate-500 hover:text-white transition-colors">Digital Automation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-500 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/case-studies" className="text-slate-500 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="/events" className="text-slate-500 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} AI-Solutions. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col w-full relative overflow-hidden bg-[#020617] text-slate-100 selection:bg-secondary selection:text-white">
          {/* Global Mesh Gradients for Frosted Glass Theme */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
          
          <Navigation />
          <main className="flex-grow pt-20 relative z-10 w-full overflow-y-auto">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/events" element={<Events />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/schedule-demo" element={<ScheduleDemo />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <AIChatAssistant />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
