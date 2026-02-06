"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

export const GlobalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Mark as mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get current theme
  const currentTheme = mounted ? (resolvedTheme || "dark") : "dark";

  // Theme-aware colors
  const getColors = useCallback(() => {
    switch (currentTheme) {
      case "light":
        return {
          blob1: "rgba(255, 137, 6, 0.3)",     // Orange - strong on white
          blob2: "rgba(139, 92, 246, 0.25)",   // Purple - strong on white
        };
      case "bw":
        return {
          blob1: "rgba(100, 100, 100, 0.08)", // Subtle gray
          blob2: "rgba(80, 80, 80, 0.06)",    // Subtle darker gray
        };
      default: // dark
        return {
          blob1: "rgba(255, 137, 6, 0.08)",   // Orange
          blob2: "rgba(168, 85, 247, 0.07)",  // Purple
        };
    }
  }, [currentTheme]);

  // Main gradient animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      t += 0.002;
      
      const w = canvas.width;
      const h = canvas.height;
      
      // Clear with transparent
      ctx.clearRect(0, 0, w, h);
      
      const colors = getColors();

      // Blob 1 - top left area
      const x1 = w * 0.3 + Math.sin(t) * 150;
      const y1 = h * 0.3 + Math.cos(t * 1.2) * 100;
      const r1 = Math.min(w, h) * 0.5;
      
      const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, r1);
      g1.addColorStop(0, colors.blob1);
      g1.addColorStop(0.5, colors.blob1.replace(/[\d.]+\)$/, "0.02)"));
      g1.addColorStop(1, "transparent");
      
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Blob 2 - bottom right area
      const x2 = w * 0.7 - Math.cos(t * 0.8) * 150;
      const y2 = h * 0.7 - Math.sin(t * 1.5) * 100;
      const r2 = Math.min(w, h) * 0.5;

      const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, r2);
      g2.addColorStop(0, colors.blob2);
      g2.addColorStop(0.5, colors.blob2.replace(/[\d.]+\)$/, "0.02)"));
      g2.addColorStop(1, "transparent");

      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
      
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, [getColors]);

  // Static grain overlay
  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const w = canvas.width;
      const h = canvas.height;
      
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      
      const isLightMode = currentTheme === 'light';
      
      for (let i = 0; i < buffer32.length; i++) {
        if (Math.random() < 0.03) {
          buffer32[i] = isLightMode ? 0x08080808 : 0x20ffffff;
        }
      }
      
      ctx.putImageData(idata, 0, 0);
    }
    
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [currentTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Background base color */}
      <div className="absolute inset-0 bg-background transition-colors duration-500" />
      {/* Dynamic Gradients - no blur for better visibility */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full blur-2xl opacity-100" 
      />
      {/* Static Grain */}
      <canvas 
        ref={grainRef} 
        className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay" 
      />
    </div>
  );
};
