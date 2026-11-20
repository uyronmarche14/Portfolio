import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { projects } from "@/lib/data/projects";

const DIR = __dirname;
const sceneFiles = readdirSync(DIR).filter((f) => /^[A-Z].*\.tsx$/.test(f) && f !== "kit.tsx");
const read = (f: string) => readFileSync(join(DIR, f), "utf8");
const registry = readFileSync(join(DIR, "..", "ProjectVisuals.tsx"), "utf8");

describe("project scenes", () => {
  it("every project has a scene in the registry", () => {
    projects.forEach((p) => expect({ id: p.id, has: registry.includes(`"${p.id}":`) }).toEqual({ id: p.id, has: true }));
  });

  it("there is one scene file per project, all built on the shared kit", () => {
    expect(sceneFiles).toHaveLength(projects.length);
    sceneFiles.forEach((f) => expect({ f, kit: read(f).includes('from "./kit"') }).toEqual({ f, kit: true }));
  });

  it("every scene is a short story of 3 to 5 beats with a text description", () => {
    sceneFiles.forEach((f) => {
      const src = read(f);
      const beats = Number(/beats=\{(\d+)\}/.exec(src)?.[1]);
      expect({ f, ok: beats >= 3 && beats <= 5 }).toEqual({ f, ok: true });
      expect({ f, label: /label="[^"]{30,}"/.test(src) }).toEqual({ f, label: true });
    });
  });

  it("scenes stay inside the canvas and use only the one shared shadow filter", () => {
    [...sceneFiles, "kit.tsx"].forEach((f) => {
      const src = read(f);
      expect({ f, visible: src.includes("overflow-visible") }).toEqual({ f, visible: false });
      expect({ f, own: /<filter/.test(src) && f !== "kit.tsx" }).toEqual({ f, own: false });
    });
  });

  it("scene text names no employer applications", () => {
    const text = sceneFiles.map(read).join(" ").toLowerCase();
    ["iopex", "hris", "iconnect", "cdr", "rove"].forEach((w) => expect(new RegExp(`\\b${w}\\b`).test(text)).toBe(false));
  });
});
