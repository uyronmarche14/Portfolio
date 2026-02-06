"use client";

import Header from "@/components/ui/header";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const features = [
  "Strategic Planning",
  "Document Automation",
  "Process Optimization",
  "Timeline Execution",
];

const WorkWithMeSection = () => {
  return (
    <section id="work-with-me" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 relative group cursor-pointer">
      <div className="mb-6 sm:mb-8">
        <Header
            introText='Ready to'
            highlightText='Build Something Amazing?'
            description='Let&apos;s transform your vision into a high-performance web application'
          />
      </div>
      <Link href="/process" className="block w-full max-w-6xl mx-auto px-4">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border/50 bg-background/40 backdrop-blur-xl shadow-2xl"
        >
          {/* Background Image (Scenic) */}
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1754823296/photo_7_2025-08-10_18-53-55_y00lcx.jpg"
              alt="Mountain Scenery"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-[0.6]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e17] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-50" />
          </div>

          {/* Content Overlay - Responsive padding */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12 lg:p-16 z-10">
            <div className="max-w-2xl space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/20 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary mb-3 sm:mb-4">
                  <span>Work With Me</span>
                </div>
                
                {/* Responsive heading - smaller on mobile */}
                <Heading as="h2" className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                    From Concept to <span className="text-primary">Reality</span>
                </Heading>
                
                {/* Responsive text - smaller on mobile */}
                <Text variant="large" className="text-zinc-200 mb-4 sm:mb-6 md:mb-8 max-w-lg text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed">
                  Visualize the journey. We start with document automation and end with a synchronized timeline. Click to explore the process.
                </Text>
              </motion.div>

              {/* Features grid - stacked on very small mobile */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                {features.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary text-black shrink-0">
                      <FiCheck size={12} className="sm:hidden" strokeWidth={3} />
                      <FiCheck size={14} className="hidden sm:block" strokeWidth={3} />
                    </div>
                    <span className="text-white font-medium tracking-wide text-xs sm:text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs sm:text-sm"
              >
                View Process Map <FiArrowRight size={16} className="sm:hidden" /><FiArrowRight size={18} className="hidden sm:block" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
};

export default WorkWithMeSection;
