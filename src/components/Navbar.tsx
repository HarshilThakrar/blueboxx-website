"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { useStore } from '../store/useStore';

import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const cartItemCount = useStore((state) => state.cart.length);

  // Monitor scrolling to apply premium visual effects to Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle scrolling lock when menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  type MenuItem = {
    label: string;
    href: string;
    dropdown?: { label: string; href: string }[];
  };

  const menuItems: MenuItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Courses', href: '/courses' },
    { label: 'Internships', href: '/internships' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Experts', href: '/experts' },
    {
      label: 'Companies',
      href: '/companies',
      dropdown: [
        { label: 'Companies', href: '/companies' },
        { label: 'Placement Partners', href: '/placement-partners' },
        { label: 'Colleges', href: '/colleges' }
      ]
    },
    { label: 'Contact', href: '#footer' },
  ];

  // Mobile menu motion variants
  const menuContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
  };
  const menuItem: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  // Dashboard link based on role
  const getDashboardLink = () => {
    if (!user) return '/student/dashboard';
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'company': return '/companies/dashboard';
      case 'mentor': return '/expert/dashboard';
      default: return '/student/dashboard';
    }
  };

  return (
    <>
      {/* Sticky Header with responsive background blur */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled
          ? 'backdrop-blur-2xl bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-slate-200/50'
          : 'backdrop-blur-lg bg-white/40 border-b border-slate-200/30'
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[72px] md:h-[80px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <img
              src="/logoblue.png"
              alt="BB Logo"
              className="h-[48px] md:h-[56px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-sm"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((m) => (
              <div key={m.label} className="relative group">
                <Link href={m.href} className="relative flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-[#1B2A6B] transition-colors py-2">
                  <span>{m.label}</span>
                  {m.dropdown && (
                    <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1B2A6B] transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[#C9A227] scale-x-0 origin-left transform transition-transform duration-300 group-hover:scale-x-100" />
                </Link>

                {/* Dropdown Menu */}
                {m.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="w-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 py-2 overflow-hidden relative before:content-[''] before:absolute before:-top-2 before:left-0 before:w-full before:h-2">
                      {m.dropdown.map((sub) => (
                        <Link key={sub.label} href={sub.href} className="block px-5 py-3 text-[15px] font-medium text-slate-600 hover:bg-slate-50 hover:text-[#1B2A6B] transition-colors">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions + Toggle */}
          <div className="flex items-center gap-4">

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-slate-700 hover:text-[#1B2A6B] hover:bg-slate-100/50 rounded-full transition-colors">
              <ShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <Link href={getDashboardLink()} className="flex items-center gap-2 group">
                  <img src={user?.avatar} alt="User Avatar" className="w-9 h-9 rounded-full border-2 border-[#1B2A6B]/20 group-hover:border-[#C9A227] transition-colors object-cover" />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-[#1B2A6B]">{user?.name}</span>
                </Link>
                <button onClick={logout} className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/signup"
                className="btn-primary hidden md:inline-flex items-center gap-3 px-4 py-2 rounded-xl"
              >
                <span>Get Started</span>
              </Link>
            )}

            {/* Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100/50 transition-colors duration-200 md:hidden"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex items-center justify-center">
                <span className={`absolute w-6 h-0.5 bg-current rounded transition-all duration-300 transform ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
                <span className={`absolute w-6 h-0.5 bg-current rounded transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute w-6 h-0.5 bg-current rounded transition-all duration-300 transform ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen Overlay Menu (mobile) */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{ open: { clipPath: 'circle(150% at 100% 0%)', pointerEvents: 'auto' }, closed: { clipPath: 'circle(0% at 100% 0%)', pointerEvents: 'none' } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-white p-6 sm:p-10 flex flex-col overflow-y-auto"
      >
        {/* Header Area */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <img src="/logoblue.png" alt="BB Logo" className="h-10 w-auto object-contain" />
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Centered Menu Links */}
        <motion.nav className="flex flex-col items-center justify-center gap-4 sm:gap-6 my-auto py-8" variants={menuContainer} initial="hidden" animate={isOpen ? 'visible' : 'hidden'}>
          {menuItems.map((item) => (
            <motion.div key={item.label} variants={menuItem}>
              <Link href={item.href} onClick={() => setIsOpen(false)} className="group relative text-3xl sm:text-4xl md:text-5xl font-extrabold transition-all duration-500 py-1 tracking-tight hover:scale-105 inline-block">
                <span className="relative z-10 text-slate-900 group-hover:text-[#1B2A6B]">{item.label}</span>
                <span className="absolute -bottom-1 sm:-bottom-2 left-1/2 w-0 h-1 sm:h-1.5 bg-[#C9A227] transition-all duration-500 -translate-x-1/2 group-hover:w-full rounded-full opacity-0 group-hover:opacity-100"></span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Centered Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center border-t border-gray-100 pt-6 mt-4">
          {isAuthenticated ? (
            <div className="flex flex-col w-full gap-4">
              <Link href={getDashboardLink()} onClick={() => setIsOpen(false)} className="w-full text-center py-3.5 px-6 font-bold text-[#0d1635] bg-[#C9A227] hover:bg-[#b59123] rounded-xl shadow-lg transition-all duration-200 text-[15px]">
                Dashboard
              </Link>
              <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-center py-3.5 px-6 font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 text-[15px]">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)} className="w-full sm:w-auto sm:px-12 text-center py-3.5 px-6 font-bold text-gray-700 hover:text-[#1B2A6B] border border-gray-200 hover:border-[#1B2A6B]/30 rounded-xl transition-colors duration-200 text-[15px]">
                Login
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full sm:w-auto sm:px-12 text-center py-3.5 px-6 font-bold text-[#0d1635] bg-[#C9A227] hover:bg-[#b59123] rounded-xl shadow-lg transition-all duration-200 text-[15px]">
                Signup
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
