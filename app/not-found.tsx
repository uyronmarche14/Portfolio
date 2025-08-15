"use client";

import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { motion } from "framer-motion";

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription>
              The page you&apos;re looking for doesn&apos;t exist or has been moved to a different location.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}