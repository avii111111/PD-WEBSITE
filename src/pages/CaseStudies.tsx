import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CaseStudies() {
  const cases = [
    {
      industry: "Healthcare",
      company: "HealthPlus Networks",
      challenge: "Overwhelmed with patient inquiries and appointment scheduling, leading to long wait times and staff burnout.",
      solution: "Deployed a specialized AI Virtual Assistant capable of natural language triage, integrated directly with their patient management system.",
      impact: "Reduced call volume by 45%, automated 60% of bookings, and improved patient satisfaction scores by 30%."
    },
    {
      industry: "Finance",
      company: "Global Trade Bank",
      challenge: "Manual document processing for loan applications took weeks and introduced compliance risks due to human error.",
      solution: "Developed custom AI Software Solutions using generative AI pipelines to extract, validate, and summarize applicant data.",
      impact: "Reduced processing time from 2 weeks to 4 hours. Improved data compliance accuracy to 99.8%."
    },
    {
      industry: "Retail",
      company: "MegaMart Electronics",
      challenge: "Unable to provide personalized product recommendations to online shoppers, resulting in lower conversion rates.",
      solution: "Built a Rapid AI Prototype recommendation engine analyzing real-time browsing behavior and purchase history.",
      impact: "Increased online conversion rates by 22% within the first month of deployment."
    },
    {
      industry: "Manufacturing",
      company: "Industrial Dynamics",
      challenge: "Unexpected machinery breakdowns causing severe operational delays and revenue loss.",
      solution: "Consulted and implemented predictive analytics software utilizing IoT sensor data.",
      impact: "Predicted 90% of failures before they occurred, saving $2M annually in operational downtime."
    }
  ];

  return (
    <div className="pt-12 pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 mt-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Case Studies</h1>
          <p className="text-lg text-slate-400">
            See how organizations across various industries have transformed their operations and digital employee experience with AI-Solutions.
          </p>
        </div>

        <div className="space-y-12">
          {cases.map((cs, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl shadow-sm border border-white/10 overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-white/5 backdrop-blur-md border-r border-white/10 p-8 text-white flex flex-col justify-center">
                <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2">{cs.industry}</span>
                <h2 className="text-3xl font-display font-bold">{cs.company}</h2>
              </div>
              <div className="md:w-2/3 p-8 grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-bold text-white mb-2 border-b border-white/10 pb-2">The Challenge</h3>
                  <p className="text-sm text-slate-400">{cs.challenge}</p>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 border-b border-white/10 pb-2">AI Solution</h3>
                  <p className="text-sm text-slate-400">{cs.solution}</p>
                </div>
                <div>
                  <h3 className="font-bold text-secondary mb-2 border-b border-white/10 pb-2">Business Impact</h3>
                  <p className="text-sm font-semibold text-white">{cs.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/schedule-demo" className="inline-flex items-center px-8 py-4 bg-secondary text-white font-medium rounded-full hover:bg-secondary/90 transition border border-secondary/30 shadow-lg shadow-secondary/20-all shadow-lg hover:shadow-xl">
            Start Your Success Story
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
