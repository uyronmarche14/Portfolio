"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { CustomCursor } from "@/components/ui/CustomCursor";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      themes={["dark", "bw", "light"]}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
      <CustomCursor />
    </ThemeProvider>
  );
}

