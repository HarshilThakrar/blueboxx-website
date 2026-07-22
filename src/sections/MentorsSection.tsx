import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../animations/variants";
import { Star, Video, MessageSquare, Shield, UserCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import api from "../lib/axios";

const mentors = [
  {
    id: 1, name: "Tushar Mohite", role: "Owner @ Vertexx Animation Studio", exp: "8 yrs", rating: 0.0,
    sessions: 0, skills: ["3D Animation", "Graphics Design", "VFX"],
    price: "₹499/30m", badge: "VFX Instructor",
    gradientFrom: "#1B2A6B", gradientTo: "#2E45A3",
    avatarBg: "from-blue-600 to-indigo-700",
    slug: "tushar-mohite"
  },
  {
    id: 2, name: "Nirav Purandare", role: "Expert Mentor", exp: "5 yrs", rating: 0.0,
    sessions: 0, skills: ["General", "Career Guidance"],
    price: "₹499/30m", badge: "Expert",
    gradientFrom: "#3b0f6b", gradientTo: "#6d28d9",
    avatarBg: "from-violet-600 to-purple-700",
    slug: "nirav-purandare"
  },
  {
    id: 3, name: "Manav Vithani", role: "Expert Mentor", exp: "4 yrs", rating: 0.0,
    sessions: 0, skills: ["General", "Career Guidance"],
    price: "₹499/30m", badge: "Expert",
    gradientFrom: "#065f46", gradientTo: "#0f7a5a",
    avatarBg: "from-emerald-600 to-teal-700",
    slug: "manav-vithani"
  },
];

export const MentorsSection = () => {
  const fetcher = (url: string) => api.get(url).then(res => res.data.data);
  const { data: mentorsData } = useSWR('/public/experts-cms', fetcher, { revalidateOnFocus: false });
  const currentMentors = mentorsData?.length ? mentorsData : mentors;

  return (
    <section className="py-24 border-y border-slate-200 relative overflow-hidden bg-slate-50">
      {/* Soft Light Background with Subtle Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#C9A227]/10 blur-[120px]" />
      </div>
      {/* Subtle Light Dot Grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.5] z-0"
        style={{
          backgroundImage: "radial-gradient(#e2e8f0 2px, transparent 2px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.p variants={staggerItem} className="text-xs font-bold tracking-widest uppercase text-[#1B2A6B] mb-3">
            Expert Guidance
          </motion.p>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold mb-4 text-[#0d1635]">
            <span>Learn from </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B2A6B] to-[#C9A227]">Industry Leaders</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-base text-slate-600">
            Book 1-on-1 sessions for mock interviews, career guidance, and portfolio reviews with top professionals.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {currentMentors.map((mentor: any) => (
            <Link key={mentor.id} href={`/experts/${mentor.slug}`}>
              <motion.div
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-[#1B2A6B]/25 hover:shadow-[0_20px_50px_rgba(27,42,107,0.12)] transition-all duration-300"
              >
                {/* Gradient Header Banner */}
                <div
                  className="relative p-6 pb-8 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${mentor.gradientFrom}, ${mentor.gradientTo})` }}
                >
                  {/* Decorative dots on gradient header */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage: "radial-gradient(white 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  {/* Glow */}
                  <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-white/10 blur-2xl" />

                  <div className="relative flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${mentor.avatarBg} flex items-center justify-center text-white border-2 border-white/20 shadow-lg`}>
                        <UserCircle2 size={22} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">{mentor.name}</h3>
                        <p className="text-xs text-white/70">{mentor.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-white/15 border border-white/20 text-white rounded-lg backdrop-blur-sm">
                      <Star size={11} className="fill-[#C9A227] text-[#C9A227]" /> {mentor.rating}
                    </div>
                  </div>

                  <span className="inline-block px-2.5 py-1 bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#C9A227] text-xs font-semibold rounded-lg">
                    {mentor.badge}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 -mt-3 bg-white rounded-t-2xl relative z-10">
                  <div className="flex items-center gap-3 text-xs text-[#4a5568] mb-4">
                    <span className="flex items-center gap-1"><Shield size={13} className="text-[#1B2A6B]" /> {mentor.exp} exp</span>
                    <span>·</span>
                    <span>{mentor.sessions}+ sessions</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {mentor.skills?.map((s: string) => (
                      <span key={s} className="px-2.5 py-0.5 bg-[#1B2A6B]/6 text-[#1B2A6B] text-xs font-medium rounded-md border border-[#1B2A6B]/12">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-base font-bold text-[#0d1635]">{mentor.price}</span>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90"
                        style={{ background: `linear-gradient(135deg, #1B2A6B, #2E45A3)`, color: "white" }}>
                        <Video size={13} /> Book
                      </div>
                      <div className="p-2 rounded-lg border border-slate-200 text-[#1B2A6B] hover:bg-[#1B2A6B]/5 transition-colors">
                        <MessageSquare size={15} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Browse All Experts Button */}
        <div className="mt-12 text-center">
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              href="/experts"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all border-2 border-[#1B2A6B] text-[#1B2A6B] hover:bg-[#1B2A6B] hover:text-white"
            >
              <Sparkles size={15} />
              Browse All Experts
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
