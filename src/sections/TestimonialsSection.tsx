import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useCountUp } from "../hooks/useAnimations";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Send, 
  Heart,
  Users,
  Building2,
  TrendingUp,
  Trophy,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface TestimonialType {
  id: number;
  name: string;
  role: string;
  company: string;
  year: string;
  rating: number;
  content: string;
  avatar: string;
  highlightedText: string;
}

const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: "Vikram Nair",
    role: "Data Analyst",
    company: "Amazon",
    year: "Placed in 2024",
    rating: 5,
    content: "I had zero coding background. Now I'm a Data Analyst at Amazon. The structured curriculum, patient mentors, and hands-on projects made this possible. Thank you BlueBoxx!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    highlightedText: "Data Analyst at Amazon."
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Software Engineer",
    company: "Microsoft",
    year: "Placed in 2023",
    rating: 5,
    content: "The full stack course completely transformed my career trajectory. The live projects were real, the mentorship was gold, and the placement support team was with me every step of the way.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    highlightedText: "Software Engineer @ Microsoft"
  },
  {
    id: 3,
    name: "Rahul Singh",
    role: "UX Designer",
    company: "Flipkart",
    year: "Placed in 2024",
    rating: 5,
    content: "BlueBoxx is unlike any edtech platform. I didn't just learn design, I got a 3-month internship that filled my portfolio with real-world projects. The curriculum is world-class.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    highlightedText: "UX Designer @ Flipkart"
  },
  {
    id: 4,
    name: "Ananya Sharma",
    role: "Digital Marketer",
    company: "Zomato",
    year: "Placed in 2024",
    rating: 5,
    content: "The mock interview sessions and resume feedback sessions were a game-changer. I walked into my interview with confidence. Worth every investment!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    highlightedText: "Digital Marketer @ Zomato"
  }
];

const statItems = [
  { label: "Alumni Placed", value: 5000, suffix: "+", icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100" },
  { label: "Hiring Partners", value: 400, suffix: "+", icon: Building2, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  { label: "Success Rate", value: 94, suffix: "%", icon: TrendingUp, color: "text-purple-600 bg-purple-50 border-purple-100" },
  { label: "Projects Completed", value: 3000, suffix: "+", icon: Trophy, color: "text-amber-500 bg-amber-50 border-amber-100" },
];

const AnimatedCount = ({ end, suffix }: { end: number; suffix: string }) => {
  const { count, ref } = useCountUp(end, 1800);
  return (
    <>
      <span ref={ref}>{count.toLocaleString("en-IN")}</span>
      {suffix}
    </>
  );
};

const CompanyMiniLogo = ({ name }: { name: string }) => {
  if (name === "Google") {
    return (
      <span className="font-bold tracking-tight text-xs">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </span>
    );
  }
  if (name === "Microsoft") {
    return (
      <span className="flex items-center gap-1 font-semibold text-[#737373] text-xs">
        <span className="grid grid-cols-2 gap-[1px] w-2.5 h-2.5 flex-shrink-0">
          <span className="bg-[#F25022] w-1 h-1"></span>
          <span className="bg-[#7FBA00] w-1 h-1"></span>
          <span className="bg-[#00A4EF] w-1 h-1"></span>
          <span className="bg-[#FFB900] w-1 h-1"></span>
        </span>
        <span>Microsoft</span>
      </span>
    );
  }
  if (name === "Amazon") {
    return (
      <span className="font-extrabold tracking-tighter text-slate-800 text-xs flex flex-col items-center leading-none">
        <span>amazon</span>
        <span className="text-[#FF9900] text-[5px] mt-[-2px]">▼</span>
      </span>
    );
  }
  if (name === "Flipkart") {
    return (
      <span className="flex items-center gap-0.5 font-bold italic text-[#2874F0] text-xs">
        <span>Flipkart</span>
      </span>
    );
  }
  if (name === "Zomato") {
    return (
      <span className="font-extrabold text-[#E23744] text-xs tracking-tight">
        zomato
      </span>
    );
  }
  return <span className="font-bold text-slate-700 text-xs">{name}</span>;
};

const renderContent = (text: string, highlight: string) => {
  if (!highlight) return text;
  const parts = text.split(highlight);
  if (parts.length < 2) return text;
  return (
    <>
      {parts[0]}
      <span className="text-[#C9A227] font-semibold">{highlight}</span>
      {parts[1]}
    </>
  );
};

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const prev = () => { 
    setIsAutoPlaying(false); 
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); 
  };
  
  const next = () => { 
    setIsAutoPlaying(false); 
    setCurrent((c) => (c + 1) % testimonials.length); 
  };

  return (
    <section ref={containerRef} className="py-[120px] bg-gradient-to-b from-white via-blue-50/15 to-white text-slate-900 overflow-hidden relative border-b border-[#E5E7EB]">
      {/* Soft Blur Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-blue-200/20 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] rounded-full bg-purple-100/30 blur-[100px]" />
      </div>

      {/* Floating Sparkle Element - Left */}
      <div className="absolute left-6 lg:left-16 top-[180px] hidden md:flex flex-col items-center z-10 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="text-blue-400"
        >
          <Sparkles size={24} />
        </motion.div>
      </div>

      {/* Floating Paper Airplane Element - Right */}
      <div className="absolute right-6 lg:right-16 top-[150px] hidden md:flex flex-col items-center z-10 pointer-events-none">
        <motion.div 
          animate={{ y: [0, 6, 0], x: [0, 4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="text-blue-400 relative"
        >
          <Send size={24} className="rotate-45" />
          <svg className="absolute top-8 right-4 text-blue-200 w-24 h-16" viewBox="0 0 100 60" fill="none">
            <path d="M90 5 C50 20, 20 35, 5 55" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#1B2A6B]/15 bg-[#1B2A6B]/5 text-[#1B2A6B] text-xs font-semibold mb-5 shadow-sm">
            <Heart size={13} className="text-[#1B2A6B] fill-[#1B2A6B]/10" />
            <span>OUR ALUMNI, OUR PRIDE</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1635] tracking-tight leading-tight mb-4 font-sora">
            Alumni <span className="text-[#C9A227]">Success</span> Stories
          </h2>
          <p className="text-base text-[#4a5568] font-inter">
            Hear from our alumni who are now working at top tech companies worldwide.
          </p>
        </div>

        {/* Testimonials Slider Wrapper */}
        <div className="max-w-4xl mx-auto relative px-4">
          
          {/* Left Arrow (Outer) */}
          <button 
            onClick={prev} 
            aria-label="Previous Testimonial"
            className="absolute -left-6 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-slate-100 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.08)] flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-100 transition-all z-30 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Right Arrow (Outer) */}
          <button 
            onClick={next} 
            aria-label="Next Testimonial"
            className="absolute -right-6 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-slate-100 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.08)] flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-100 transition-all z-30 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

          {/* Testimonial Card — Navy+Gold Gradient Background */}
          <div className="rounded-[2.5rem] border border-[#1B2A6B]/15 p-8 md:p-14 shadow-[0_20px_60px_rgba(27,42,107,0.10)] relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0d1635 0%, #1B2A6B 45%, #1e3170 100%)",
            }}
          >
            {/* Gold dot pattern */}
            <div aria-hidden className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(#C9A227 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
            {/* Gold top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.15),transparent_70%)] pointer-events-none" />
            {/* Visual Quotes Shapes in Corners */}
            <span className="text-[#C9A227]/20 text-[180px] font-serif absolute -top-10 -left-2 leading-none select-none pointer-events-none">"</span>
            <span className="text-[#C9A227]/10 text-[220px] font-serif absolute -bottom-36 -right-2 leading-none select-none pointer-events-none">"</span>


            <div className="relative min-h-[200px] flex items-center z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full"
                >
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} size={15} className="fill-[#C9A227] text-[#C9A227]" />
                    ))}
                  </div>

                  {/* Quote Paragraph */}
                  <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed mb-8 font-inter">
                    "{renderContent(testimonials[current].content, testimonials[current].highlightedText)}"
                  </p>

                  {/* Profile Block */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-[#C9A227]/50 relative overflow-hidden flex-shrink-0 shadow-sm">
                      <img 
                        src={testimonials[current].avatar} 
                        alt={testimonials[current].name} 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-emerald-400"></span>
                    </div>
                    <div>
                      <div className="font-extrabold text-white text-base leading-tight font-sora">{testimonials[current].name}</div>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/55 mt-1 font-inter">
                        <span>{testimonials[current].role}</span>
                        <span>•</span>
                        <span>{testimonials[current].year}</span>
                        <span>•</span>
                        {/* Company logo tag */}
                        <div className="inline-flex shrink-0 transform scale-[0.8] origin-left align-middle select-none">
                          <CompanyMiniLogo name={testimonials[current].company} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-[#1B2A6B]" : "w-2 bg-slate-200"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20 border-t border-slate-100 pt-12">
          {statItems.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 justify-center lg:justify-start">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${stat.color} flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.01)]`}>
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0F172A] tracking-tight font-sora leading-tight">
                  <AnimatedCount end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-semibold text-[#64748B] font-inter mt-0.5 tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Stories Button */}
        <div className="mt-16 text-center">
          <Link href="/success-stories" className="inline-flex items-center gap-2 font-bold text-[#1B2A6B] hover:text-[#C9A227] transition-colors duration-200">
            Read More Success Stories <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};
