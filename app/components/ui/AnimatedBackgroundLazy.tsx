"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), {
  ssr: false,
  loading: () => null, // no placeholder keeps markup clean
});

export default function AnimatedBackgroundLazy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Optional: only load after first paint to keep LCP fast
    const id = requestIdleCallback(() => setMounted(true));
    return () => cancelIdleCallback(id);
  }, []);

  return mounted ? <AnimatedBackground /> : null;
}