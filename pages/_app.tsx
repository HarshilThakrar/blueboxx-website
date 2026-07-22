import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../src/context/ThemeContext";
import { AuthProvider } from "../src/context/AuthContext";
import { MockDataProvider } from "../src/context/MockDataContext";
import { ConfirmProvider } from "../src/context/ConfirmContext";
import { TourProvider } from "../src/context/TourContext";
import { SettingsProvider } from "../src/contexts/SettingsContext";
import { OnboardingTour } from "../src/components/ui/OnboardingTour";
import { ScholarshipPopup } from "../src/components/ScholarshipPopup";
import "../src/index.css";
import { LoadingScreen } from "../src/components/LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

// Pages where the scholarship popup should NOT appear
const AUTH_PAGES = [
  "/login",
  "/signup",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
  "/verify-email",
];

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Reduced from 16s to 2s — the LoadingScreen itself handles its own animation.
    // Users should not be blocked from page content for 16 seconds.
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const isAuthPage = AUTH_PAGES.some(
    (path) => router.pathname === path || router.pathname.startsWith(path + "/")
  );

  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfirmProvider>
          <TourProvider>
            <SettingsProvider>
              <MockDataProvider>
              <Toaster position="bottom-right" />
              <OnboardingTour />
              {/* Only show ScholarshipPopup on non-auth pages */}
              {!isAuthPage && <ScholarshipPopup />}
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
          </SettingsProvider>
        </TourProvider>
      </ConfirmProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
