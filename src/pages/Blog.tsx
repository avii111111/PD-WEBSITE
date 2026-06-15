import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Blog() {
  const articles = [
    {
      id: 1,
      category: "Future of Work",
      title: "The Future Of AI At Work",
      excerpt: "How intelligent agents are shifting from supportive tools to collaborative team members.",
      date: "Oct 12, 2026",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800&h=400"
    },
    {
      id: 2,
      category: "Productivity",
      title: "How AI Improves Productivity",
      excerpt: "Real-world metrics demonstrating organizational throughput increases by up to 40% after implementing generative models.",
      date: "Oct 05, 2026",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400"
    },
    {
      id: 3,
      category: "Automation",
      title: "AI Automation For Businesses",
      excerpt: "From HR onboarding to IT ticketing: A comprehensive guide on identifying automation targets.",
      date: "Sep 28, 2026",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&q=80&w=800&h=400"
    }
  ];

  return (
    <div className="pt-12 pb-24 top-0 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Insights & News</h1>
            <p className="text-lg text-slate-400">Explore the latest articles on artificial intelligence, business automation, and digital strategy.</p>
          </div>
          <div className="w-full md:w-72 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg leading-5 bg-white/5 backdrop-blur-md placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-secondary focus:border-secondary sm:text-sm" 
              placeholder="Search articles..." 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-white/10 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-slate-900/90 border border-white/20 backdrop-blur-sm text-xs font-semibold text-white rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs text-slate-400 mb-3">{article.date}</div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">{article.title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-1">{article.excerpt}</p>
                <Link to={`/blog/${article.id}`} className="inline-flex items-center text-secondary font-medium hover:text-white transition-colors text-sm group mt-auto">
                  Read Article
                  <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
