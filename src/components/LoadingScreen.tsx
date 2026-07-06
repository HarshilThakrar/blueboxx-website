"use client";
import { useState, useEffect, useRef } from "react";

export const LoadingScreen = ({ onComplete }: { onComplete?: () => void }) => {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleDismiss = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      if (onComplete) onComplete();
    }, 1000); // match transition duration (1000ms)
  };

  useEffect(() => {
    // Disable scrolling when loading is active
    document.body.style.overflow = "hidden";

    // Dismiss the loading screen after 15 seconds, or when the video ends
    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    const vid = videoRef.current;
    let onEnded: (() => void) | null = null;
    if (vid) {
      onEnded = () => {
        handleDismiss();
      };
      vid.addEventListener('ended', onEnded);
    }

    return () => {
      clearTimeout(timer);
      if (vid && onEnded) vid.removeEventListener('ended', onEnded);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-all duration-1000 ease-in-out`}
      style={{
        clipPath: fadeOut ? "circle(0% at 100% 0%)" : "circle(150% at 100% 0%)",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="relative w-[90%] max-w-6xl aspect-video flex items-center justify-center bg-white">
        <video
          ref={videoRef}
          src="/loading.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain"
          onError={(e) => {
            // Dismiss immediately on error
            console.error("Loading video failed to load", e);
            handleDismiss();
          }}
        />
      </div>
    </div>
  );
};
