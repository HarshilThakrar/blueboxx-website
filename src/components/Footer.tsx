import Link from "next/link";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, BookOpen, Users, Briefcase, Award, MapPin, Mail, Phone, Send, Loader2 } from "lucide-react";
import { useGlobalSettings } from "../contexts/SettingsContext";
import toast from "react-hot-toast";
import api from "../lib/axios";

const footerLinks = {
  companyInfo: [
    { label: "About us", href: "/about" },
    { label: "Contact us", href: "/contact" },
    { label: "Work With Us", href: "/careers" },
    { label: "Explore Services", href: "/courses" },
  ],
  supportZone: [
    { label: "Help and Support", href: "/contact" },
    { label: "Join Us", href: "/signup" },
  ],
  unlockPotential: [
    { label: "Learn with Blueboxx", href: "/courses" },
    { label: "Teach on Blueboxx", href: "/contact" },
  ],
  featuredCourses: [
    { label: "Full Stack Development", href: "/courses/full-stack-development" },
    { label: "Graphic Design", href: "/courses/graphic-designing" },
    { label: "Digital Marketing", href: "/courses/digital-marketing" },
    { label: "UI/UX Design", href: "/courses/ui-ux-design" },
    { label: "Data Analytics", href: "/courses/data-analytics" },
    { label: "View All Courses", href: "/courses" },
  ],
  legal: [
    { label: "Terms and conditions", href: "/terms" },
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Cookie policy", href: "/privacy-policy#cookies" },
    { label: "Harassment policy", href: "/harassment-policy" },
  ],
};

const stats = [
  { icon: BookOpen, value: "20+", label: "Industry Courses" },
  { icon: Users, value: "2.5K+", label: "Students Placed" },
  { icon: Briefcase, value: "120+", label: "Hiring Partners" },
  { icon: Award, value: "4.9★", label: "Avg Rating" },
];

export const Footer = () => {
  const { settings } = useGlobalSettings();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await api.post("/public/newsletter/subscribe", { email });
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <footer id="footer" className="relative overflow-hidden bg-[#0d1635] text-slate-300 pt-0 pb-0">

      {/* Top stats bar */}
      <div className="bg-gradient-to-r from-[#1B2A6B] via-[#1e3170] to-[#1B2A6B] border-b border-white/8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 py-3 px-2 md:px-4 text-center md:text-left">
                <div className="w-8 h-8 rounded-lg bg-[#C9A227]/15 border border-[#C9A227]/25 flex items-center justify-center flex-shrink-0">
                  <stat.icon size={16} className="text-[#C9A227]" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white leading-none mb-1">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium whitespace-nowrap">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(#C9A227 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Corner glows */}
        <div className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full bg-[#1B2A6B]/40 blur-[100px]" />
        <div className="absolute bottom-0 -left-16 w-[350px] h-[350px] rounded-full bg-[#C9A227]/8 blur-[120px]" />

        {/* Abstract geometric lines (SVG) */}
        <svg
          className="absolute right-0 top-0 w-[480px] h-full opacity-[0.04] text-[#C9A227]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          aria-hidden
        >
          <path d="M-20,0 L120,100 M-20,25 L120,125" />
          <path d="M120,0 L-20,100 M120,25 L-20,125" />
          <circle cx="50" cy="50" r="30" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="48" />
        </svg>

        {/* Left decorative circles */}
        <svg
          className="absolute left-0 bottom-0 w-[280px] h-[280px] opacity-[0.04] text-[#C9A227]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          aria-hidden
        >
          <circle cx="0" cy="100" r="40" />
          <circle cx="0" cy="100" r="60" strokeDasharray="2 3" />
          <circle cx="0" cy="100" r="80" />
        </svg>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 pt-6 pb-2 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 mb-4">

          {/* Brand & Newsletter column */}
          <div className="lg:w-2/5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6">
                <img src={settings.footer_logo || "logowhite.png"} alt={settings.website_name || "BlueBoxx logo"} className="h-14 w-auto object-contain rounded-md shadow-sm" />
              </Link>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-1.5">Never Miss A Post!</h3>
                <p className="text-slate-400 text-xs mb-3">Choose the most powerful courses and always be on demand.</p>
                <form className="flex gap-2" onSubmit={handleSubscribe}>
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter e-mail Address"
                      className="w-full bg-[#1B2A6B]/30 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <button type="submit" disabled={isLoading} className="bg-[#C9A227] text-[#0d1635] px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#d8b02c] transition-colors flex items-center justify-center shrink-0 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a href={`mailto:${settings.support_email || 'info.blueboxx@gmail.com'}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-[#C9A227] transition-colors">
                <Mail size={16} className="text-[#C9A227]/80 flex-shrink-0" />
                {settings.support_email || 'info.blueboxx@gmail.com'}
              </a>
              <a href={`tel:${settings.support_phone || '+919023512853'}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-[#C9A227] transition-colors">
                <Phone size={16} className="text-[#C9A227]/80 flex-shrink-0" />
                {settings.support_phone || '+91 90235 12853'}
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400 max-w-sm">
                <MapPin size={16} className="text-[#C9A227]/80 flex-shrink-0 mt-0.5" />
                <span>SF 02, INDIA BULLS MEGA MALL, Dinesh Mill Rd, near Swami Vivekananda Railway Over Bridge, Anand Nagar, Akota, Vadodara, Gujarat 390022</span>
              </div>
            </div>
          </div>

          {/* Right Links Section */}
          <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-4">

            {/* Company Info */}
            <div>
              <h4 className="font-bold text-white mb-5 text-sm tracking-wide uppercase">Company Info</h4>
              <ul className="flex flex-col gap-3 text-sm">
                {footerLinks.companyInfo.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-slate-400 hover:text-[#C9A227] transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Zone & Unlock Potential */}
            <div>
              <div className="mb-6">
                <h4 className="font-bold text-white mb-5 text-sm tracking-wide uppercase">Support Zone</h4>
                <ul className="flex flex-col gap-3 text-sm">
                  {footerLinks.supportZone.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-slate-400 hover:text-[#C9A227] transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-5 text-sm tracking-wide uppercase">Unlock Your Potential</h4>
                <ul className="flex flex-col gap-3 text-sm">
                  {footerLinks.unlockPotential.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-slate-400 hover:text-[#C9A227] transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Featured Courses */}
            <div>
              <h4 className="font-bold text-white mb-5 text-sm tracking-wide uppercase">Featured courses</h4>
              <ul className="flex flex-col gap-3 text-sm">
                {footerLinks.featuredCourses.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-slate-400 hover:text-[#C9A227] transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 pb-10 flex flex-col xl:flex-row items-center justify-between gap-4 text-center xl:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-3 sm:gap-4 text-slate-500 text-xs w-full xl:w-auto">
            <span>&copy; {new Date().getFullYear()} {settings.footer_copyright || 'BlueBoxx. All rights reserved.'}</span>
            <span className="hidden sm:inline">|</span>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {footerLinks.legal.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-[#C9A227] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full xl:w-auto pr-[12rem] sm:pr-[15rem] lg:pr-[18rem]">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, label: "Twitter", href: settings.twitter_url || "https://x.com/BlueboxxDnA" },
                { Icon: Linkedin, label: "LinkedIn", href: settings.linkedin_url || "https://www.linkedin.com/in/blueboxx-da-ab509428/" },
                { Icon: Instagram, label: "Instagram", href: settings.instagram_url || "https://www.instagram.com/blueboxxda_/" },
                { Icon: Facebook, label: "Facebook", href: settings.facebook_url || "https://www.facebook.com/profile.php?id=100091587679727" },
                { Icon: Send, label: "YouTube", href: settings.youtube_url } // Reusing Send icon if Youtube isn't imported
              ].filter(s => !!s.href).map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#C9A227] hover:border-[#C9A227]/40 hover:bg-[#C9A227]/10 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
