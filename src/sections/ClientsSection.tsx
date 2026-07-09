import { useRef } from "react";
import { motion, useAnimationFrame, useInView } from "framer-motion";
import { useCountUp } from "../hooks/useAnimations";
import {
  GraduationCap,
  Users,
  Briefcase,
  Star,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface CompanyType {
  name: string;
  logoUrl?: string;
}

const ROW1_COMPANIES: CompanyType[] = [
  { name: "Framestore" },
  { name: "Weta Digital" },
  { name: "Method Studios" },
  { name: "Vistaprint" },
  { name: "Anibrain" },
  { name: "Basilic Fly Studio" },
  { name: "Lakshya Digital" },
  { name: "Tau Films" },
];

const ROW2_COMPANIES: CompanyType[] = [
  { name: "Office Beacon" },
  { name: "DQ Entertainment" },
  { name: "Hopmotion" },
  { name: "AISECT" },
  { name: "ADF Aroma De France" },
  { name: "Contiloe Pictures" },
  { name: "Golden Robot" },
  { name: "After Studios" }
];

const stats = [
  { value: 2500, suffix: "+", label: "Students", icon: GraduationCap },
  { value: 120, suffix: "+", label: "Partners", icon: Users },
  { value: 850, suffix: "+", label: "Projects", icon: Briefcase },
  { value: 94, suffix: "%", label: "Placement Rate", icon: Star },
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

const GrowthCurve = () => (
  <svg className="w-8 h-4 text-[#C9A227] shrink-0" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 22C8.5 20.5 13.5 10.5 19.5 10.5C25.5 10.5 27.5 17 33.5 13.5C39.5 10 42.5 3 46 2"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);



const CompanyLogo = ({ name, logoUrl }: { name: string; logoUrl?: string }) => {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className="h-9 max-w-[130px] object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
      />
    );
  }
  return <span className="font-bold text-slate-700 text-sm tracking-tight">{name}</span>;
};

const CustomMarquee = ({ companies, speed = 35, reverse = false }: { companies: CompanyType[]; speed?: number; reverse?: boolean }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const isPaused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (isPaused.current || !innerRef.current) return;
    const dir = reverse ? 1 : -1;
    xRef.current += (dir * speed * delta) / 1000;
    const halfWidth = innerRef.current.scrollWidth / 2;
    if (xRef.current <= -halfWidth) xRef.current = 0;
    if (xRef.current >= 0 && reverse) xRef.current = -halfWidth;
    innerRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  return (
    <div
      className="relative overflow-hidden py-2"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      <div ref={innerRef} className="flex will-change-transform gap-4 w-max items-center py-1">
        {companies.map((c, i) => (
          <div key={`a-${c.name}-${i}`} className="h-16 w-[170px] rounded-xl bg-white border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center shrink-0 hover:scale-[1.05] hover:border-[#1B2A6B]/20 hover:shadow-[0_8px_20px_rgba(27,42,107,0.06)] transition-all duration-300 cursor-pointer group">
            <CompanyLogo name={c.name} logoUrl={c.logoUrl} />
          </div>
        ))}
        {companies.map((c, i) => (
          <div key={`b-${c.name}-${i}`} className="h-16 w-[170px] rounded-xl bg-white border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center shrink-0 hover:scale-[1.05] hover:border-[#1B2A6B]/20 hover:shadow-[0_8px_20px_rgba(27,42,107,0.06)] transition-all duration-300 cursor-pointer group">
            <CompanyLogo name={c.name} logoUrl={c.logoUrl} />
          </div>
        ))}
      </div>
    </div>
  );
};

export interface ClientsSectionProps {
  titlePrefix?: string;
  highlightText?: string;
  subtitle?: string;
}

export const ClientsSection = ({
  titlePrefix = "Our ",
  highlightText = "Clients & Partners",
  subtitle = "The world-class companies we work with"
}: ClientsSectionProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={containerRef} className="bg-white py-[120px] overflow-hidden border-y border-[#E5E7EB] relative">
      {/* Decorative Dots Pattern Background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 75%)"
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-20">

        {/* Floating Graphics Element - Left */}
        <div className="absolute left-[-20px] xl:left-0 top-[40px] hidden lg:flex flex-col items-center z-30">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-[0_12px_24px_rgba(15,23,42,0.05)] flex items-center justify-center relative rotate-[-6deg]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B2A6B]/8 text-[#1B2A6B] flex items-center justify-center">
              <Users size={18} />
            </div>
          </motion.div>
        </div>



        {/* Floating Graphics Element - Right */}
        <div className="absolute right-[-20px] xl:right-0 top-[60px] hidden lg:flex flex-col items-center z-30">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-[0_12px_24px_rgba(15,23,42,0.05)] flex items-center justify-center relative rotate-[8deg]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B2A6B]/8 text-[#1B2A6B] flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div className="absolute -top-12 -right-8 w-24 h-24 bg-blue-100/40 rounded-full blur-2xl pointer-events-none z-[-1]" />
          </motion.div>
        </div>



        {/* Header content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-[#0F172A] font-sora font-extrabold text-3xl md:text-5xl tracking-tight mb-4 leading-tight"
          >
            {titlePrefix}<span className="text-[#C9A227]">{highlightText}</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-[#64748B] font-inter text-sm md:text-base leading-relaxed mb-6"
          >
            {subtitle}
          </motion.p>

          {/* Checked Feature Pills */}

        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1100px] mx-auto mb-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-slate-200/80 p-3.5 px-4 shadow-[0_10px_25px_rgba(13,22,53,0.02)] hover:shadow-[0_15px_35px_rgba(27,42,107,0.08)] transition-all duration-300 hover:border-[#1B2A6B]/20 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                {/* Navy icon box */}
                <div className="w-10 h-10 rounded-xl bg-[#1B2A6B]/8 text-[#1B2A6B] flex items-center justify-center flex-shrink-0">
                  <stat.icon size={18} />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-extrabold text-[#0F172A] font-sora tracking-tight leading-none">
                    <AnimatedCount end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[9px] font-bold text-[#64748B] font-inter mt-1.5 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>

              {/* Curve line */}
              <GrowthCurve />
            </motion.div>
          ))}
        </motion.div>

        {/* Brand Logos Carousel Box */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="rounded-[2rem] border border-[#E5E7EB] bg-slate-50/30 py-6 px-12 shadow-[0_8px_30px_rgba(15,23,42,0.02)] relative mb-14"
        >
          {/* Arrow Button Indicators */}
          <div className="absolute -left-4 top-[50%] -translate-y-1/2 w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-200 cursor-pointer shadow-sm z-30 transition-all">
            <ChevronLeft size={16} />
          </div>
          <div className="absolute -right-4 top-[50%] -translate-y-1/2 w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-200 cursor-pointer shadow-sm z-30 transition-all">
            <ChevronRight size={16} />
          </div>

          <div className="flex flex-col gap-4">
            <CustomMarquee companies={[...ROW1_COMPANIES, ...ROW2_COMPANIES]} speed={36} />
          </div>
        </motion.div>

        {/* Trust Rating Banner removed per user request */}



      </div>
    </section>
  );
};
