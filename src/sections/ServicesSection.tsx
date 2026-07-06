import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../animations/variants";
import { Laptop, PenTool, TrendingUp, Cpu, Palette, Search, ArrowRight } from "lucide-react";

const services = [
  { id: 1, title: "Website Development", icon: Laptop, desc: "High-performance websites and web apps built with modern tech stacks." },
  { id: 2, title: "UI/UX Design", icon: PenTool, desc: "Premium user experiences, wireframes, and design systems." },
  { id: 3, title: "Branding & Identity", icon: Palette, desc: "Complete brand guidelines, logos, and visual identity." },
  { id: 4, title: "SEO & Content", icon: Search, desc: "Technical SEO, content strategy, and search engine ranking." },
  { id: 5, title: "Digital Marketing", icon: TrendingUp, desc: "Performance campaigns across major platforms." },
];

export const ServicesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#f8f7ff" }}>
      {/* Diagonal grid lines */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(45deg,rgba(27,42,107,0.06) 1px,transparent 1px),linear-gradient(-45deg,rgba(27,42,107,0.06) 1px,transparent 1px)",
        backgroundSize: "36px 36px",
      }} />
      {/* Central radial glow */}
      <div aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none z-0">
        <div className="w-[700px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08),transparent_70%)]" />
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.p variants={staggerItem} className="text-xs font-bold tracking-widest uppercase text-[#C9A227] mb-3">
            Our Agency
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold text-[#0d1635] mb-4">
            Digital Agency Services
          </motion.h2>
          <motion.p variants={staggerItem} className="text-base text-[#4a5568]">
            Beyond education, our agency delivers premium digital solutions for startups, SMEs, and enterprises.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className="group relative card-premium p-6 rounded-2xl transition-all duration-300 hover:border-[#1B2A6B]/25 hover:shadow-[0_20px_50px_rgba(27,42,107,0.1)] bg-white/80 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1B2A6B]/8 flex items-center justify-center mb-5 text-[#1B2A6B] group-hover:bg-[#1B2A6B] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
                <service.icon size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0d1635] mb-2 group-hover:text-[#1B2A6B] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#4a5568] text-sm leading-relaxed mb-4">
                {service.desc}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1B2A6B] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                Learn More <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 card-premium p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto"
        >
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-1">Have a project in mind?</h4>
            <p className="text-sm text-slate-500">Get a free proposal within 24 hours. No commitments.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg btn-primary font-medium text-sm shrink-0">
            Discuss Your Project <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
