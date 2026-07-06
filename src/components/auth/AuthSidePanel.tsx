import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const partners = [
  "Google", "Microsoft", "Amazon", "Meta", "Netflix", "Apple", "Spotify", "Adobe"
];

export const AuthSidePanel = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="hidden lg:flex w-[60%] relative flex-col justify-center gap-16 overflow-hidden p-12 xl:p-16">
      {/* Background Image - Custom Generated LMS Theme */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `url('/api/local-image')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      {/* Dark Base Color Overlay */}
      <div className="absolute inset-0 bg-[#080d26]/85 z-0" />

      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen opacity-60">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: ["-10%", "10%", "-10%"],
            y: ["-10%", "10%", "-10%"]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#1B2A6B]/80 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [360, 180, 0],
            x: ["10%", "-10%", "10%"],
            y: ["10%", "-10%", "10%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-[#C9A227]/40 via-[#e0b840]/10 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            y: ["0%", "20%", "0%"]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[30%] w-[50%] h-[50%] rounded-full bg-[#1B2A6B]/60 blur-[150px]"
        />
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 pointer-events-none"></div>

      {/* Top Section */}
      <div className="relative z-10 flex flex-col gap-6 max-w-lg mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] xl:text-[10px] font-bold text-slate-300 uppercase tracking-wider">Join the learning revolution</span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-[1.2] tracking-tight mb-4">
            Fast-track your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#e0b840]">
              career journey.
            </span>
          </h1>
          <p className="text-slate-400 text-sm xl:text-base leading-relaxed max-w-md">
            Master in-demand skills, build real-world projects, and get hired by top companies through our intensive programs.
          </p>
        </motion.div>



        {/* Animated Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 mb-2 relative hidden sm:block"
        >
          <div className="flex items-center justify-between text-[9px] xl:text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">
            <span className="text-[#C9A227] bg-[#080d26] px-2 rounded-full py-0.5 border border-[#C9A227]/30">Learn</span>
            <span className="bg-[#080d26] px-2 py-0.5 rounded-full border border-white/10">Projects</span>
            <span className="bg-[#080d26] px-2 py-0.5 rounded-full border border-white/10">Internship</span>
            <span className="text-white bg-[#080d26] px-2 py-0.5 rounded-full border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">Placement</span>
          </div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-800/80 -translate-y-1/2 overflow-hidden rounded-full z-0">
            <motion.div
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent w-1/3"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 w-full mt-4">
        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-6">Trusted by top companies</p>
        <div className="flex overflow-hidden relative w-full h-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            className="flex gap-16 items-center whitespace-nowrap min-w-max"
          >
            {[...partners, ...partners].map((partner, i) => (
              <div key={i} className="text-slate-400/40 text-xl xl:text-2xl font-extrabold uppercase tracking-widest hover:text-slate-400/60 transition-colors cursor-default">
                {partner}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};


