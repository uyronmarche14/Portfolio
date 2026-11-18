import type { MetadataRoute } from "next";

import { projects } from "@/lib/data/projects";
import { workExperience } from "@/lib/data/workExperience";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/experience",
    "/process",
    "/analytics",
    "/design",
    ...workExperience.map((entry) => `/experience/${entry.id}`),
    ...projects.map((project) => `/projects/${project.id}`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
