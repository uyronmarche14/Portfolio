"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { FilterTabs } from "@/components/ui/FilterTabs";
import HeaderTitle from "@/components/ui/header";
import { Button } from "@/components/ui/shadcn/button";
import {
  achievementsData,
  categoryFilters,
  type AchievementCategory,
} from "@/lib/data/achievements";

import { AchievementDialog } from "./AchievementDialog";
import { AchievementFeatured } from "./AchievementFeatured";
import { AchievementLedger } from "./AchievementLedger";
import { categoryIcons } from "./categoryIcons";
import { categoryTone } from "./categoryTone";


const PAGE_SIZE = 6;

const featuredItem = achievementsData.find((a) => a.featured) ?? achievementsData[0];

export default function AchievementExplorer() {
  const [activeFilter, setActiveFilter] = useState<AchievementCategory>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return achievementsData.filter(
      (a) =>
        (activeFilter === "all" || a.category === activeFilter) &&
        (!needle || `${a.title} ${a.issuer} ${a.date} ${a.description} ${(a.tags ?? []).join(" ")}`.toLowerCase().includes(needle))
    );
  }, [activeFilter, query]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const remaining = filteredItems.length - visibleItems.length;

  const changeFilter = (key: AchievementCategory) => {
    setActiveFilter(key);
    setVisibleCount(PAGE_SIZE);
  };

  // The featured card can be opened while a filter hides it; fall back to the full list then.
  const dialogItems = filteredItems.some((a) => a.id === openId) ? filteredItems : achievementsData;

  return (
    <section id="achievements" className="relative w-full overflow-hidden py-12 md:py-16">
      <div className="mx-auto mb-10 w-full max-w-7xl px-4 sm:px-6 md:mb-12 lg:px-8">
        <HeaderTitle
          index="04"
          introText="Achievements"
          highlightText="Honors, Leadership & Certifications"
          description="A collection of academic honors, student leadership roles, competitions, certifications, conference exposure, and technical support work across my university journey."
        />
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        {featuredItem && <AchievementFeatured item={featuredItem} onOpen={setOpenId} />}

        <div>
          <FilterTabs
            centered
            label="Achievement categories"
            className="mb-4"
            value={activeFilter}
            onChange={changeFilter}
            fullWidth
            items={categoryFilters.map((filter) => ({
              key: filter.key,
              label: filter.label,
              icon: categoryIcons[filter.key],
              iconClassName: filter.key === "all" ? undefined : categoryTone[filter.key].icon,
              count:
                filter.key === "all"
                  ? achievementsData.length
                  : achievementsData.filter((a) => a.category === filter.key).length,
            }))}
          />
          <label className="relative mx-auto mb-4 block w-full max-w-sm">
            <span className="sr-only">Search achievements</span>
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search achievements"
              className="h-11 w-full rounded-md border border-foreground/15 bg-card pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          {filteredItems.length === 0 && (
            <p role="status" className="rounded-xl border border-dashed border-foreground/20 px-6 py-10 text-center text-sm text-foreground/70">
              No achievements match your search.
            </p>
          )}
          <AchievementLedger items={visibleItems} listKey={activeFilter} onOpen={setOpenId} />
          {remaining > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                Load more
                <span className="font-mono text-xs text-foreground/50">{remaining} left</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <AchievementDialog items={dialogItems} openId={openId} onOpenChange={setOpenId} />
    </section>
  );
}
