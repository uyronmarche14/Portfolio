"use client";

import dynamic from "next/dynamic";

/** Client-only, code-split wrapper so the figure never blocks first paint. Reserves the 5:4 box to avoid layout shift. */
export const LazyHairlineFigure = dynamic(() => import("./HairlineFigure"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="aspect-[5/4] w-full" />,
});
