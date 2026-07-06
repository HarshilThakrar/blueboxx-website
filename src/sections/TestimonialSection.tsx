import { Star } from "lucide-react";

export const TestimonialSection = () => {
  const testimonials = [
    { text: "Got an internship after two mocks with Aarav. Highly recommended!", author: "Ayushi Sharma", role: "Frontend Developer", initial: "A", color: "bg-pink-100 text-pink-600" },
    { text: "Ishita helped me ship a full ML capstone. Amazing mentorship.", author: "Samar Verma", role: "Data Science Intern", initial: "S", color: "bg-blue-100 text-blue-600" },
    { text: "Best 30 minutes on React. Web vitals improved significantly.", author: "Prakash Iyer", role: "SDE I @ Startup", initial: "P", color: "bg-emerald-100 text-emerald-600" },
    { text: "Clear roadmap + resume fix = interview calls. Thank you!", author: "Ritika Singh", role: "Product Manager", initial: "R", color: "bg-purple-100 text-purple-600" },
    { text: "Priya's product strategy session changed my approach completely.", author: "Rahul Das", role: "Senior PM", initial: "R", color: "bg-amber-100 text-amber-600" },
    { text: "Vikram's DevOps guidance saved me weeks of trial and error.", author: "Karan Patel", role: "DevOps Engineer", initial: "K", color: "bg-cyan-100 text-cyan-600" }
  ];

  return (
    <div className="bg-slate-50 py-20 relative overflow-hidden border-t border-slate-100">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1B2A6B] rounded-full blur-[150px] opacity-[0.03] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C9A227] rounded-full blur-[150px] opacity-[0.03] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B2A6B]/5 border border-[#1B2A6B]/10 text-[#1B2A6B] text-xs font-bold mb-4">
            <Star size={14} className="fill-[#C9A227] text-[#C9A227]" /> 4.9/5 Average Rating
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 font-sora tracking-tight">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B2A6B] to-[#C9A227]">Learners</span></h2>
          <p className="text-sm font-semibold text-slate-500 max-w-lg mx-auto">Real success feedback from learners who booked mentor mock calls and resume review sessions.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between hover:border-[#1B2A6B]/20 hover:shadow-[0_8px_30px_rgba(27,42,107,0.06)] hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div className="absolute top-0 right-6 -mt-1 text-5xl text-[#C9A227]/20 font-serif group-hover:text-[#C9A227]/40 transition-colors pointer-events-none">"</div>
              
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={12} className="fill-[#C9A227] text-[#C9A227]" />
                ))}
              </div>

              <p className="text-slate-600 text-xs font-semibold leading-relaxed mb-6 italic relative z-10">"{t.text}"</p>
              
              <div className="flex items-center gap-3 mt-auto">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.author)}&background=random&color=fff&size=128&bold=true`}
                  alt={t.author}
                  className="w-10 h-10 rounded-full shadow-sm object-cover border border-slate-100"
                />
                <div>
                  <div className="text-xs font-black text-slate-900">{t.author}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
