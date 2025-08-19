"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Project Not Found</CardTitle>
            <CardDescription>
              The project you&apos;re looking for doesn&apos;t exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/#projects">
                Back to Projects
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}