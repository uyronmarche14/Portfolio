"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/shadcn/button";

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full text-center border-2 border-foreground bg-background shadow-brutal-lg p-8 sm:p-12"
      >
        <h1 className="font-rawkner text-7xl sm:text-8xl font-bold text-primary mb-4 uppercase">404</h1>
        
        <h2 className="font-rawkner text-2xl font-bold text-foreground mb-3 uppercase">Project Not Found</h2>
        
        <p className="text-foreground/60 text-sm mb-8">
          The project you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Button asChild>
          <Link href="/#projects">
            Back to Projects
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}