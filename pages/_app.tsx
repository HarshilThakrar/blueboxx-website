import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../src/context/ThemeContext";
import { AuthProvider } from "../src/context/AuthContext";
import { MockDataProvider } from "../src/context/MockDataContext";
import { ConfirmProvider } from "../src/context/ConfirmContext";
import { TourProvider } from "../src/context/TourContext";
import { OnboardingTour } from "../src/components/ui/OnboardingTour";
import "../src/index.css";
import { LoadingScreen } from "../src/components/LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const generateTitle = (pathname: string) => {
  if (pathname === "/") return "Blueboxx DA";
  
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "Blueboxx DA";

  const pageName = segments
    .map(segment => {
      if (segment.startsWith('[') && segment.endsWith(']')) return "Details";
      return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    })
    .join(" ");

  return `${pageName} | Blueboxx DA`;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 16000);
    return () => clearTimeout(t);
  }, []);

  const pageTitle = generateTitle(router.pathname);

  return (
    <ThemeProvider>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Blueboxx DA - Where Creativity Meets Innovation" />
        <meta name="application-name" content="Blueboxx DA" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:site_name" content="Blueboxx DA" />
        <meta property="og:description" content="Blueboxx DA - Where Creativity Meets Innovation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <ConfirmProvider>
          <TourProvider>
            <MockDataProvider>
              <Toaster position="bottom-right" />
              <OnboardingTour />
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
