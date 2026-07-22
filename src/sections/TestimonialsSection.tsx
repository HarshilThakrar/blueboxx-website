import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Send, 
  Heart
} from "lucide-react";
import useSWR from "swr";
import api from "../lib/axios";
import Image from "next/image";

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
    name: "Ved Patel",
    role: "Graphic Design Student",
    company: "",
    year: "2023",
    rating: 5,
    content: "I'm currently learning Graphic Design at Blueboxx DA, and my experience has been excellent. The faculty are highly supportive, the environment is creative, and the practical approach has helped me improve my skills significantly. Highly recommended for aspiring designers.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    highlightedText: "improve my skills significantly"
  },
  {
    id: 2,
    name: "Mansi Sonvane",
    role: "Creative Student",
    company: "",
    year: "2021",
    rating: 5,
    content: "Blueboxx DA is one of the best creative and training institutes in Vadodara. The team is professional, mentorship is excellent, and the practical learning approach makes it a great place to build real-world skills.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    highlightedText: "build real-world skills"
  },
  {
    id: 3,
    name: "Krish Bhuvela",
    role: "Web Development Student",
    company: "",
    year: "2024",
    rating: 5,
    content: "My experience at Blueboxx DA has been extremely positive. The mentors are knowledgeable, supportive, and focused on practical learning. I highly recommend it to anyone looking to build a strong career in IT and web development.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    highlightedText: "strong career in IT and web development"
  },
  {
    id: 4,
    name: "Ansh Gohil",
    role: "Digital Marketing Student",
    company: "",
    year: "2019",
    rating: 5,
    content: "Blueboxx DA provided me with real industry exposure and a supportive work environment. I gained valuable hands-on experience in digital marketing and learned practical skills that boosted my confidence.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    highlightedText: "real industry exposure"
  },
  {
    id: 5,
    name: "Mihir Shah",
    role: "Graphic Design Student",
    company: "",
    year: "2022",
    rating: 5,
    content: "The Graphic Design training at Blueboxx DA helped me grow professionally and improve my practical skills. The guidance I received also helped me start my career, and I'm grateful for the support.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    highlightedText: "improve my practical skills"
  },
  {
    id: 6,
    name: "Adarsh Pandey",
    role: "Web Development Student",
    company: "",
    year: "2025",
    rating: 5,
    content: "I joined Blueboxx DA for Web Development training, and my experience was excellent. The instructors explained concepts clearly and provided practical knowledge that was very helpful throughout the course.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
    highlightedText: "explained concepts clearly"
  },
  {
    id: 7,
    name: "Saifil Vohra",
    role: "Student",
    company: "",
    year: "2018",
    rating: 5,
    content: "Amazing experience! The team is creative, professional, and delivers high-quality work. I'm very satisfied with the services and would highly recommend Blueboxx DA.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    highlightedText: "delivers high-quality work"
  },
  {
    id: 8,
    name: "Yadav Mayurdhavaj Sinh",
    role: "Student",
    company: "",
    year: "2020",
    rating: 5,
    content: "Blueboxx DA stands out for its creativity, professionalism, and attention to detail. The team delivers quality work and creates an inspiring environment for learning and growth.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    highlightedText: "inspiring environment for learning"
  },
  {
    id: 9,
    name: "Jay Salunke",
    role: "Student",
    company: "",
    year: "2017",
    rating: 5,
    content: "Blueboxx DA is a great place to gain industry knowledge. The experienced faculty and practical approach helped me learn valuable skills for my career.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    highlightedText: "gain industry knowledge"
  },
  {
    id: 10,
    name: "Varsha Savant",
    role: "Intern",
    company: "",
    year: "2016",
    rating: 5,
    content: "The company provided valuable learning opportunities and practical experience. The supportive environment made it a great place to develop new skills.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    highlightedText: "valuable learning opportunities"
  },
  {
    id: 11,
    name: "Hardik Shah",
    role: "Student",
    company: "",
    year: "2015",
    rating: 5,
    content: "Had a great experience with Blueboxx DA. The team is professional, supportive, and genuinely focused on helping learners grow. The training programs are practical, well-structured, and aligned with current industry requirements.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    highlightedText: "aligned with current industry requirements"
  },
  {
    id: 12,
    name: "Deepak Patel",
    role: "Intern",
    company: "",
    year: "2014",
    rating: 5,
    content: "I am currently doing an internship at Blueboxx DA, and my experience has been very positive. The team is supportive, and I am getting practical exposure to real-world projects. The mentors guide us well and help improve both technical and professional skills.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
    highlightedText: "practical exposure to real-world projects"
  },
  {
    id: 13,
    name: "Prem Thapa",
    role: "App Development Student",
    company: "",
    year: "2026",
    rating: 5,
    content: "Excellent organization with a professional team and a strong focus on quality. Blueboxx DA provides practical learning, software and mobile application development experience, and great career growth opportunities.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    highlightedText: "software and mobile application development experience"
  },
  {
    id: 14,
    name: "Parth Shiravale",
    role: "Student",
    company: "",
    year: "2021",
    rating: 5,
    content: "My experience at Blueboxx DA has been excellent. The trainers are knowledgeable, supportive, and explain concepts in a practical way. The hands-on learning approach has helped me build confidence and improve my skills.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    highlightedText: "explain concepts in a practical way"
  }
];



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
  useInView(containerRef, { once: true, margin: "-100px" });

  const fetcher = (url: string) => api.get(url).then(res => res.data.data);
  const { data: testimonialsData } = useSWR('/public/testimonials-cms', fetcher, { revalidateOnFocus: false });

  const currentTestimonials = testimonialsData?.length ? testimonialsData : testimonials;

  useEffect(() => {
    if (!isAutoPlaying || !currentTestimonials.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % currentTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentTestimonials]);

  const prev = () => { 
    setIsAutoPlaying(false); 
    setCurrent((c) => (c - 1 + currentTestimonials.length) % currentTestimonials.length); 
  };
  
  const next = () => { 
    setIsAutoPlaying(false); 
    setCurrent((c) => (c + 1) % currentTestimonials.length); 
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
            <span>REAL REVIEWS, REAL IMPACT</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1635] tracking-tight leading-tight mb-4 font-sora">
            Our <span className="text-[#C9A227]">Success</span> Stories
          </h2>
          <p className="text-base text-[#4a5568] font-inter">
            Hear from our students, interns, and employees about their journey with Blueboxx DA.
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
              {currentTestimonials.length > 0 && (
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
                    {Array.from({ length: currentTestimonials[current].rating || 5 }).map((_, i) => (
                      <Star key={i} size={15} className="fill-[#C9A227] text-[#C9A227]" />
                    ))}
                  </div>

                  {/* Quote Paragraph */}
                  <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed mb-8 font-inter">
                    "{renderContent(currentTestimonials[current].content, currentTestimonials[current].highlightedText || '')}"
                  </p>

                  {/* Profile Block */}
                  <div className="flex items-center gap-4">
                    {currentTestimonials[current].avatar && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                        <Image src={currentTestimonials[current].avatar} alt={currentTestimonials[current].name} fill className="object-cover" sizes="48px" />
                      </div>
                    )}
                    <div>
                      <div className="font-extrabold text-white text-base leading-tight font-sora">{currentTestimonials[current].name}</div>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/55 mt-1 font-inter">
                        <span>{currentTestimonials[current].role}</span>
                        {currentTestimonials[current].year && (
                          <>
                            <span>•</span>
                            <span>{currentTestimonials[current].year}</span>
                          </>
                        )}
                        {currentTestimonials[current].company && (
                          <>
                            <span>•</span>
                            <div className="inline-flex shrink-0 transform scale-[0.8] origin-left align-middle select-none">
                              <CompanyMiniLogo name={currentTestimonials[current].company} />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              )}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {currentTestimonials.map((_, i) => (
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


      </div>
    </section>
  );
};
