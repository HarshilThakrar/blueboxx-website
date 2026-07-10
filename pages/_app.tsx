import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../src/context/ThemeContext";
import { AuthProvider } from "../src/context/AuthContext";
import { MockDataProvider } from "../src/context/MockDataContext";
import { ConfirmProvider } from "../src/context/ConfirmContext";
import { TourProvider } from "../src/context/TourContext";
import { OnboardingTour } from "../src/components/ui/OnboardingTour";
import { ScholarshipPopup } from "../src/components/ScholarshipPopup";
import "../src/index.css";
import { LoadingScreen } from "../src/components/LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 16000);
    return () => clearTimeout(t);
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfirmProvider>
          <TourProvider>
            <MockDataProvider>
              <Toaster position="bottom-right" />
              <OnboardingTour />
              <ScholarshipPopup />
              {isLoading ? (
                <LoadingScreen onComplete={() => setIsLoading(false)} />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={router.pathname}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      animate: { 
                        opacity: 1, 
                        y: 0, 
                        transition: { 
                          duration: 0.45, 
                          ease: "easeOut",
                          when: "beforeChildren",
                          staggerChildren: 0.1
                        } 
                      },
                      exit: { 
                        opacity: 0, 
                        transition: { duration: 0.3, ease: "easeIn" } 
                      }
                    }}
                    className="min-h-screen"
                  >
                    <Component {...pageProps} />
                  </motion.div>
                </AnimatePresence>
              )}
            </MockDataProvider>
          </TourProvider>
        </ConfirmProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
