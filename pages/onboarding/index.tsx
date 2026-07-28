import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "../../src/components/ui/Button";
import { AuthBranding } from "../../src/components/AuthBranding";
import { motion } from "framer-motion";
import api from "../../src/lib/axios";
import { useAuth } from "../../src/context/AuthContext";
import { getActiveToken } from "../../src/lib/authUtils";
import toast from "react-hot-toast";
import { User, Briefcase, GraduationCap, Building2, TerminalSquare, Search } from "lucide-react";

export default function OnboardingRolePage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [selectedRole, setSelectedRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: "student", title: "Student / Learner", desc: "Learn new skills and get certified.", icon: GraduationCap },
    { id: "expert", title: "Expert / Mentor", desc: "Teach courses and guide students.", icon: User },
    { id: "company", title: "Company", desc: "Hire top talent and post jobs.", icon: Building2 },
    { id: "jobseeker", title: "Job Seeker", desc: "Find your dream job.", icon: Search },
    { id: "intern", title: "Intern", desc: "Gain real-world experience.", icon: TerminalSquare },
    { id: "college", title: "College", desc: "Manage cohorts and placements.", icon: Briefcase },
  ];

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Update the role in backend
      await api.put("/profile/role", { role: selectedRole });

      // 2. Update context state
      if (user) {
        const token = getActiveToken(router.pathname);
        if (token) {
          login({ ...user, role: selectedRole as any }, token);
        }
      }
      
      // 3. Redirect logic based on role
      toast.success("Role assigned successfully!");
      
      setTimeout(() => {
        if (selectedRole === "expert" || selectedRole === "company" || selectedRole === "jobseeker") {
          // Go to specific upload onboarding later, for now dashboard
          router.push(`/${selectedRole}/dashboard`);
        } else {
          router.push(`/${selectedRole}/dashboard`);
        }
      }, 500);
      
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to assign role.");
      setIsLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-[450px] shrink-0 flex flex-col justify-center px-8 sm:px-12 py-6 relative overflow-y-auto custom-scrollbar z-10 shadow-[20px_0_40px_rgba(0,0,0,0.05)] bg-white font-inter"
      >
        <div className="w-full mx-auto max-w-sm py-4">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <img src="/Boxx-logo.png" alt="BlueBoxx" className="h-10 w-auto object-contain" />
          </Link>

          <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
            <motion.h2 variants={item} className="text-2xl font-black text-slate-800 mb-1.5 font-sora">How do you want to use BlueBoxx?</motion.h2>
            <motion.p variants={item} className="text-sm text-slate-500 font-medium">
              We'll personalize your experience based on your goals.
            </motion.p>
          </motion.div>

          <motion.form variants={container} initial="hidden" animate="show" onSubmit={handleContinue} className="space-y-4">
            
            <motion.div variants={item} className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar pb-2">
              {roles.map((r) => (
                <div 
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedRole === r.id 
                      ? 'border-[#1B2A6B] bg-blue-50/50 shadow-sm' 
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`mt-1 flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
                    selectedRole === r.id ? 'bg-[#1B2A6B] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <r.icon size={18} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${selectedRole === r.id ? 'text-[#0d1635]' : 'text-slate-700'}`}>
                      {r.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item}>
              <Button
                type="submit"
                disabled={isLoading || !selectedRole}
                className="w-full h-11 bg-[#1B2A6B] hover:bg-[#0d1635] text-white font-black rounded-xl text-sm shadow-[0_4px_15px_rgba(27,42,107,0.2)] transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider mt-4"
              >
                {isLoading ? "Saving..." : "Continue"}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>

      {/* Right Column - Branding */}
      <AuthBranding />
    </div>
  );
}
