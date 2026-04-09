"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Weighted inertia — the signature premium feel
      lerp: 0.08,
      // How long the scroll momentum coasts (in seconds)
      duration: 1.4,
      // Expo-out: fast start, soft cushioned stop
      easing: (t: number) => 1 - Math.pow(1 - t, 5),
      // Interpolate mouse-wheel on desktop
      smoothWheel: true,
      // Native touch on mobile — Lenis inertia on desktop only
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Drive Lenis via rAF — integrates with Framer Motion and Three.js
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose the instance globally so any component can call
    // window.__lenis.scrollTo('#section') for smooth anchor navigation
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
