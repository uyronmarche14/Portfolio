"use client";

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

  const filteredItems = useMemo(
    () => (activeFilter === "all" ? achievementsData : achievementsData.filter((a) => a.category === activeFilter)),
    [activeFilter]
  );

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
      <div className="mx-auto mb-10 w-full max-w-6xl px-4 sm:px-6 md:mb-12 lg:px-4">
        <HeaderTitle
          index="04"
          introText="Achievements"
          highlightText="Honors, Leadership & Certifications"
          description="A collection of academic honors, student leadership roles, competitions, certifications, conference exposure, and technical support work across my university journey."
        />
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 sm:px-6 lg:px-4">
        {featuredItem && <AchievementFeatured item={featuredItem} onOpen={setOpenId} />}

        <div>
          <FilterTabs
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
