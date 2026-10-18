"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section id="work-with-me" className="group relative w-full py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          title="Work with me"
          subtitle="From first document to a synced timeline, here is how a project runs."
        />
        <Link href="/process" className="block">
          <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-foreground/15 md:h-[480px]">
            <Image
              src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1754823296/photo_7_2025-08-10_18-53-55_y00lcx.jpg"
              alt="Mountain scenery"
              fill
              className="object-cover brightness-[0.6] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10 md:p-12">
              <div className="max-w-2xl">
                <h3 className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
                  From concept to reality
                </h3>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-zinc-200 md:text-lg">
                  We start with document automation and end with a synchronized timeline. Open the process map to see each step.
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {features.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white">
                      <FiCheck size={14} className="shrink-0 text-primary" strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 group-hover:underline">
                  View process map <FiArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default WorkWithMeSection;
