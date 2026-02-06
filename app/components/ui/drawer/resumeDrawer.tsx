"use client";

import { Button } from "@/components/ui/shadcn/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/shadcn/drawer";
import { Download, FileText, X } from "lucide-react";
import React, { useState } from "react";

interface ResumeDrawerProps {
  trigger?: React.ReactNode;
  resumeUrl?: string; // Allow custom resume URL
}

const ResumeDrawer: React.FC<ResumeDrawerProps> = ({
  trigger,
  resumeUrl = "/resume.pdf",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      // Create a temporary link to download the file
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "resume.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open in new tab
      window.open(resumeUrl, "_blank");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-all duration-300 rounded-xl px-4 py-2 border border-foreground/10 hover:border-foreground/30"
          >
            <FileText className="w-4 h-4" />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="h-full md:w-[50%] mt-24 ml-auto">
        <DrawerHeader className="flex flex-row items-center justify-between border-b">
          <div>
            <DrawerTitle className="text-xl font-semibold">Resume</DrawerTitle>
            <DrawerDescription>
              View and download my professional resume
            </DrawerDescription>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 p-4 overflow-hidden">
          <div className="h-full w-full border rounded-lg overflow-hidden bg-gray-50">
            <iframe
              src={resumeUrl}
              width="100%"
              height="100%"
              className="border-none"
              title="Resume PDF Viewer"
              onError={() => {
                console.error("Failed to load resume PDF");
              }}
            />
          </div>
        </div>

        <DrawerFooter className="border-t">
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => window.open(resumeUrl, "_blank")}
            >
              <FileText className="w-4 h-4 mr-2" />
              View in New Tab
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isLoading}
              className="bg-primary hover:bg-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              {isLoading ? "Downloading..." : "Download Resume"}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ResumeDrawer;
