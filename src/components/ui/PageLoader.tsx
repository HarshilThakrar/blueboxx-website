import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type Props = { onComplete?: () => void };

const PageLoader: React.FC<Props> = ({ onComplete }) => {
  const controls = useAnimation();

  useEffect(() => {
    let mounted = true;
    async function sequence() {
      // run progress animation then finish
      await controls.start({ width: ["0%", "100%"], transition: { duration: 1.6, ease: "easeOut" } });
      if (!mounted) return;
      // short fade
      await controls.start({ opacity: 0, transition: { duration: 0.4 } });
      if (onComplete) onComplete();
    }
    sequence();
    return () => { mounted = false; };
  }, [controls, onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white">
      <div className="w-[min(720px,90%)] p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_16px_40px_rgba(37,99,235,0.12)]">
            <img src="/logo.png" alt="BlueBoxx logo" className="h-12 w-12 object-contain" />
          </div>
        </div>

        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div animate={controls} initial={{ width: 0, opacity: 1 }} className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400" />
        </div>

        <div className="mt-4 text-center text-slate-600 text-sm">Preparing your learning experience</div>
      </div>
    </div>
  );
};

export default PageLoader;
