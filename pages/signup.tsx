import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "../src/components/ui/Button";
import { Mail, Lock, User, ChevronRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { AuthBranding } from "../src/components/AuthBranding";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const getStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (pass.match(/[A-Z]/)) score += 25;
    if (pass.match(/[0-9]/)) score += 25;
    if (pass.match(/[^A-Za-z0-9]/)) score += 25;
    return score;
  };

  const strength = getStrength(password);
  let strengthColor = "bg-slate-200";
  let strengthText = "";
  if (strength > 0) { strengthColor = "bg-rose-500"; strengthText = "Weak"; }
  if (strength > 25) { strengthColor = "bg-amber-400"; strengthText = "Fair"; }
  if (strength > 50) { strengthColor = "bg-blue-500"; strengthText = "Good"; }
  if (strength > 75) { strengthColor = "bg-emerald-500"; strengthText = "Strong"; }

  const passwordsMatch = password && confirmPassword ? password === confirmPassword : true;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch || strength < 50) return;
    
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding");
    }, 1500);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
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
        className="w-full lg:w-[450px] shrink-0 flex flex-col justify-center px-8 sm:px-12 py-6 relative overflow-y-auto custom-scrollbar z-10 shadow-[20px_0_40px_rgba(0,0,0,0.05)] bg-white"
      >
        <div className="w-full mx-auto max-w-sm py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-6">
            <img src="/logoblue.png" alt="BlueBoxx" className="h-10 w-auto object-contain" />
          </Link>

          <motion.div variants={container} initial="hidden" animate="show" className="mb-6">
            <motion.h2 variants={item} className="text-2xl font-black text-slate-800 mb-1.5">Create an account</motion.h2>
            <motion.p variants={item} className="text-sm text-slate-500 font-medium">Join BlueBoxx and start building your career.</motion.p>
          </motion.div>

          <motion.form variants={container} initial="hidden" animate="show" onSubmit={handleSignup} className="space-y-4">



            <motion.div variants={item} className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 focus:border-[#1B2A6B] focus:ring-2 focus:ring-[#1B2A6B]/20 outline-none transition-all font-semibold text-slate-800 text-sm bg-white"
                />
              </div>
            </motion.div>

            <motion.div variants={item} className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 focus:border-[#1B2A6B] focus:ring-2 focus:ring-[#1B2A6B]/20 outline-none transition-all font-semibold text-slate-800 text-sm bg-white"
                />
              </div>
            </motion.div>

            <motion.div variants={item} className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-11 pr-11 rounded-xl border border-slate-200 focus:border-[#1B2A6B] focus:ring-2 focus:ring-[#1B2A6B]/20 outline-none transition-all font-semibold text-slate-800 text-sm tracking-widest bg-white"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {/* Password Strength Meter */}
              {password && (
                <div className="pt-2 px-1">
                  <div className="flex gap-1.5 h-1.5 w-full mb-2">
                    <div className={`h-full flex-1 rounded-full transition-colors duration-300 ${strength > 0 ? strengthColor : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full transition-colors duration-300 ${strength > 25 ? strengthColor : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full transition-colors duration-300 ${strength > 50 ? strengthColor : 'bg-slate-200'}`} />
                    <div className={`h-full flex-1 rounded-full transition-colors duration-300 ${strength > 75 ? strengthColor : 'bg-slate-200'}`} />
                  </div>
                  <p className={`text-[10px] font-bold ${strength > 50 ? 'text-emerald-600' : 'text-slate-500'} flex justify-between`}>
                    <span>Password Strength: {strengthText}</span>
                    {strength > 75 && <span className="flex items-center gap-1"><CheckCircle2 size={12}/> Awesome</span>}
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div variants={item} className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest ml-1">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-11 pr-11 rounded-xl border focus:ring-2 outline-none transition-all font-semibold text-slate-800 text-sm tracking-widest bg-white ${
                    !passwordsMatch 
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' 
                      : 'border-slate-200 focus:border-[#1B2A6B] focus:ring-[#1B2A6B]/20'
                  }`}
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {!passwordsMatch && (
                <p className="text-[10px] font-bold text-rose-500 ml-1 mt-0.5">Passwords do not match.</p>
              )}
            </motion.div>

            <motion.div variants={item}>
              <Button
                type="submit"
                disabled={isLoading || !email || !password || !name || !passwordsMatch || strength < 50}
                className="w-full h-11 bg-[#1B2A6B] hover:bg-[#0d1635] text-white font-black rounded-xl text-sm shadow-[0_4px_15px_rgba(27,42,107,0.2)] transition-all group disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider mt-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Continue Setup <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </motion.div>

            <motion.p variants={item} className="text-[10px] font-semibold text-slate-400 text-center mt-3">
              By creating an account, you agree to our <a href="#" className="text-[#1B2A6B] hover:underline">Terms of Service</a> and <a href="#" className="text-[#1B2A6B] hover:underline">Privacy Policy</a>.
            </motion.p>

            <motion.p variants={item} className="text-center text-xs font-medium text-slate-600 mt-4 pb-2">
              Already have an account? <Link href="/login" className="font-bold text-[#1B2A6B] hover:underline">Log in</Link>
            </motion.p>

          </motion.form>
        </div>
      </motion.div>

      {/* Right Column - Branding */}
      <AuthBranding />

    </div>
  );
}
