"use client";

import { useState } from 'react';
import { WhatsappIcon } from './WhatsappIcon';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

export const FloatingActions = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[99] flex flex-col gap-4 items-end pointer-events-none">
      
      {/* Inquiry Popup Form */}
      <AnimatePresence>
        {isInquiryOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto bg-white rounded-2xl shadow-[0_8px_40px_rgb(0,0,0,0.12)] w-[calc(100vw-3rem)] sm:w-[360px] p-6 mb-2 border border-slate-100 relative origin-bottom-right"
          >
            <button 
              onClick={() => setIsInquiryOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-extrabold text-[#0d1635] mb-2 pr-6">Want to know more?</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Discover more information about the program and get your questions answered.
            </p>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Callback request sent successfully!'); setIsInquiryOpen(false); }}>
              <div>
                <label className="block text-sm font-bold text-[#0d1635] mb-1.5">Full name</label>
                <Input placeholder="Enter your full name" required className="bg-white border-[#1B2A6B]/20 focus-visible:border-[#C9A227] focus-visible:ring-[#C9A227]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0d1635] mb-1.5">Email</label>
                <Input type="email" placeholder="Enter your email" required className="bg-white border-[#1B2A6B]/20 focus-visible:border-[#C9A227] focus-visible:ring-[#C9A227]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0d1635] mb-1.5">Phone number</label>
                <div className="flex">
                  <div className="bg-slate-50 border border-[#1B2A6B]/20 border-r-0 rounded-l-lg px-3 flex items-center justify-center">
                    <span className="text-lg">🇮🇳</span>
                  </div>
                  <Input type="tel" placeholder="(000) 000-0000" required className="rounded-l-none bg-white border-[#1B2A6B]/20 focus-visible:border-[#C9A227] focus-visible:ring-[#C9A227]" />
                </div>
              </div>
              <Button className="w-full bg-[#C9A227] hover:bg-[#d8b02c] text-[#0d1635] font-bold mt-2 py-3 shadow-lg shadow-[#C9A227]/20" type="submit">
                Request Callback
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Direct Inquiry Button */}
      <div className="pointer-events-auto relative group">
        <button 
          onClick={() => setIsInquiryOpen(!isInquiryOpen)}
          className="flex items-center justify-center w-14 h-14 bg-[#1B2A6B] text-white rounded-full shadow-[0_8px_30px_rgb(27,42,107,0.3)] hover:scale-110 hover:shadow-[0_8px_30px_rgb(27,42,107,0.5)] transition-all duration-300 relative z-10"
          aria-label="Inquire Now"
        >
          {isInquiryOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
        
        {!isInquiryOpen && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-800 text-sm font-bold px-4 py-2 rounded-xl shadow-lg border border-slate-100 whitespace-nowrap hidden sm:block">
            Need guidance?
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 border-[6px] border-transparent border-l-white"></div>
          </div>
        )}
      </div>

    </div>
  );
};
