import { Bot, Code2, Rocket, LineChart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Services() {
  const services = [
    {
      id: "virtual-assistant",
      title: "AI Virtual Assistant",
      icon: Bot,
      features: [
        "Natural Language Processing scenarios",
        "24/7 Customer support automation",
        "Internal employee assistance & HR ticketing",
        "Smart recommendations engine",
        "Seamless human agent escalation"
      ]
    },
    {
      id: "software",
      title: "AI Software Development",
      icon: Code2,
      features: [
        "Custom Enterprise software solutions",
        "Legacy system AI integration",
        "Workflow automation and RPA",
        "Data pipeline construction",
        "Predictive analytics engines"
      ]
    },
    {
      id: "prototyping",
      title: "AI Prototyping",
      icon: Rocket,
      features: [
        "Minimum Viable Product (MVP) creation",
        "Rapid experimentation and testing",
        "Proof of Concept development",
        "Technical feasibility studies",
        "Iterative deployment cycles"
      ]
    },
    {
      id: "consulting",
      title: "AI Consulting",
      icon: LineChart,
      features: [
        "Comprehensive AI strategy formation",
        "Implementation roadmap planning",
        "Business transformation guidance",
        "Security and compliance audits",
        "ROI projection analysis"
      ]
    }
  ];

  return (
    <div className="pt-12 pb-24">
      {/* Header */}
      <div className="bg-transparent text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our AI Solutions</h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Comprehensive AI services designed to enhance digital employee experience and accelerate business growth.
        </p>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10 hover:shadow-2xl transition-shadow flex flex-col">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 rounded-xl bg-blue-500/10 flex items-center justify-center mr-4">
                  <service.icon className="h-7 w-7 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-white">{service.title}</h2>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5 mr-2" />
                    <span className="text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to={`/schedule-demo?service=${service.id}`} className="mt-auto w-full py-3 px-4 bg-transparent text-white font-medium rounded-lg text-center border border-white/20 hover:bg-secondary/90 hover:text-white transition-colors">
                Request Demo
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
