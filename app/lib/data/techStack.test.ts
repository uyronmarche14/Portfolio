
import { projects } from "./projects";
import { groupTech, hasTech } from "./techStack";

describe("techStack", () => {
  it("covers every technology used in projects.ts", () => {
    const missing = [...new Set(projects.flatMap((p) => p.technologies))].filter((t) => !hasTech(t));
    expect(missing).toEqual([]);
  });

  it("groups technologies in display order", () => {
    const groups = groupTech(["Docker", "React", "MySQL"]);
    expect(groups.map((g) => g.category)).toEqual(["Frontend", "Data", "Infra"]);
  });
});
