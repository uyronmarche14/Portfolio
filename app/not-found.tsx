"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/shadcn/button";

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full text-center border-2 border-foreground bg-background shadow-brutal-lg p-8 sm:p-12"
      >
        {/* Big 404 */}
        <h1 className="font-rawkner text-7xl sm:text-8xl font-bold text-primary mb-4 uppercase">404</h1>
        
        <h2 className="font-rawkner text-2xl font-bold text-foreground mb-3 uppercase">Page Not Found</h2>
        
        <p className="text-foreground/60 text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a different location.
        </p>

        <div className="flex flex-col gap-3">
          <Button asChild>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#projects">
              View Projects
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}