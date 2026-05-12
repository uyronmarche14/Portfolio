"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import HeaderTitle from "@/components/ui/header";
import {
  achievementsData,
  categoryFilters,
  type AchievementCategory,
  type Achievement,
} from "@/lib/data/achievements";

// ─── Detail Panel ───
function AchievementDetail({ item }: { item: Achievement }) {
  const Icon = item.icon;
  const hasImage = !!item.image;

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full flex flex-col"
    >
      {/* Certificate / Award Image Preview */}
      {hasImage && (
        <div className="relative w-full h-48 sm:h-56 md:h-64 border-2 border-foreground overflow-hidden mb-6 group/img">
          <div
            className="absolute inset-0 bg-cover bg-center grayscale group-hover/img:grayscale-0 transition-all duration-500 scale-100 group-hover/img:scale-105"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
          {/* Category badge on image */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 bg-background border-2 border-foreground font-mono text-[10px] font-bold uppercase tracking-wider text-foreground shadow-brutal-sm">
              {categoryFilters.find((f) => f.key === item.category)?.label}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-4 flex-1">
        {/* Header Row: Icon + Title + Date */}
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center border-2 border-foreground bg-primary/10 p-3 shadow-brutal-sm flex-shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            {!hasImage && (
              <span className="inline-block mb-1.5 px-2 py-0.5 bg-primary/10 text-primary font-mono text-[10px] font-bold uppercase tracking-wider border border-primary/30">
                {categoryFilters.find((f) => f.key === item.category)?.label}
              </span>
            )}
            <h3 className="font-rawkner font-bold text-2xl sm:text-3xl md:text-4xl text-foreground uppercase tracking-wide leading-tight">
              {item.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
              <span className="font-mono text-xs font-bold text-foreground/70 uppercase tracking-wider">
                {item.issuer}
              </span>
              <span className="w-1 h-1 bg-foreground/40" />
              <span className="font-mono text-xs text-foreground/50 uppercase tracking-wider">
                {item.date}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-sm sm:text-base text-foreground/70 leading-relaxed">
          {item.description}
        </p>

        {/* Impact Statement */}
        {item.impact && (
          <div className="flex items-start gap-3 pl-4 border-l-4 border-primary">
            <p className="font-sans text-sm text-foreground/80 italic">
              &quot;{item.impact}&quot;
            </p>
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border border-primary/30 text-primary bg-primary/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View Certificate Button */}
        {item.certificateUrl && (
          <div className="mt-auto pt-4 border-t-2 border-foreground/20">
            <a
              href={item.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background font-mono text-xs font-bold uppercase tracking-wider text-foreground shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              View Certificate
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── List Item ───
function AchievementListItem({
  item,
  isActive,
  onClick,
}: {
  item: Achievement;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-3 sm:p-4 border-2 transition-all duration-200 group/item
        ${isActive
          ? "border-foreground bg-primary/10 shadow-brutal-sm translate-x-[-2px] translate-y-[-2px]"
          : "border-foreground/20 bg-background hover:border-foreground/50 hover:bg-foreground/5"
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            flex-shrink-0 p-1.5 border transition-colors duration-200
            ${isActive ? "border-primary bg-primary/10" : "border-foreground/30 bg-foreground/5"}
          `}
        >
          <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-foreground/50"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`
              font-rawkner font-bold text-sm uppercase tracking-wide leading-tight truncate
              ${isActive ? "text-foreground" : "text-foreground/80"}
            `}
          >
            {item.title}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-wider truncate">
              {item.issuer}
            </span>
          </div>
          <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
            {item.date}
          </span>
        </div>
      </div>
    </button>
  );
}

// ─── Mobile Compact Card ───
function MobileCompactCard({
  item,
  isActive,
  onClick,
}: {
  item: Achievement;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 w-36 sm:w-44 p-3 border-2 text-left transition-all duration-200
        ${isActive
          ? "border-foreground bg-primary/10 shadow-brutal-sm"
          : "border-foreground/20 bg-background"
        }
      `}
    >
      <div className={`p-1.5 border mb-2 w-fit ${isActive ? "border-primary bg-primary/10" : "border-foreground/30"}`}>
        <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-foreground/50"}`} />
      </div>
      <div className="font-rawkner font-bold text-xs uppercase tracking-wide leading-tight line-clamp-2 text-foreground">
        {item.title}
      </div>
      <div className="font-mono text-[9px] text-foreground/40 uppercase tracking-wider mt-1 truncate">
        {item.date}
      </div>
    </button>
  );
}

// ─── Main Component ───
export default function AchievementExplorer() {
  const [activeFilter, setActiveFilter] = useState<AchievementCategory>("all");
  const [selectedId, setSelectedId] = useState<string>(achievementsData[0]?.id ?? "");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return achievementsData;
    return achievementsData.filter((a) => a.category === activeFilter);
  }, [activeFilter]);

  const selectedItem = useMemo(() => {
    return filteredItems.find((a) => a.id === selectedId) ?? filteredItems[0];
  }, [selectedId, filteredItems]);

  const handleFilterChange = useCallback(
    (key: AchievementCategory) => {
      setActiveFilter(key);
      // Auto-select first item when filter changes
      const newFiltered = key === "all" ? achievementsData : achievementsData.filter((a) => a.category === key);
      if (newFiltered.length > 0) {
        setSelectedId(newFiltered[0].id);
      }
    },
    []
  );

  return (
    <section
      id="achievements"
      className="relative w-full min-h-screen flex flex-col justify-center py-16 sm:py-24 overflow-hidden"
    >
      {/* Section Header */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 mb-8 md:mb-12">
        <HeaderTitle
          introText="Leadership, Academics"
          highlightText="& Certifications"
          description="A collection of academic honors, student leadership roles, competitions, certifications, conference exposure, and technical support work across my university journey."
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
        
        {/* ── Filter Tabs ── */}
        <div className="achievement-filter-scroll flex items-center gap-2 mb-6 overflow-x-auto pb-3">
          {categoryFilters.map((filter) => {
            const isActive = activeFilter === filter.key;
            const count =
              filter.key === "all"
                ? achievementsData.length
                : achievementsData.filter((a) => a.category === filter.key).length;

            return (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={`
                  flex-shrink-0 px-3 sm:px-4 py-2 border-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider
                  transition-all duration-200
                  ${isActive
                    ? "border-foreground bg-primary text-background shadow-brutal-sm"
                    : "border-foreground/30 bg-background text-foreground/70 hover:border-foreground hover:text-foreground"
                  }
                `}
              >
                {filter.label}
                <span className={`ml-1.5 ${isActive ? "text-background/70" : "text-foreground/40"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Desktop: Master-Detail Layout ── */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-6 min-h-[60vh]">
          {/* Left: Scrollable List */}
          <div className="achievement-panel-scroll flex flex-col gap-2 overflow-y-auto max-h-[60vh] pr-3">
            {filteredItems.map((item) => (
              <AchievementListItem
                key={item.id}
                item={item}
                isActive={selectedItem?.id === item.id}
                onClick={() => setSelectedId(item.id)}
              />
            ))}
            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-foreground/40 font-mono text-xs uppercase tracking-wider">
                No items in this category
              </div>
            )}
          </div>

          {/* Right: Detail Panel */}
          <div className="achievement-panel-scroll border-2 border-foreground bg-background shadow-brutal p-6 sm:p-8 overflow-y-auto max-h-[60vh] pr-4">
            <AnimatePresence mode="wait">
              {selectedItem && <AchievementDetail item={selectedItem} />}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: Horizontal Scroll + Detail Below ── */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Horizontal card strip */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {filteredItems.map((item) => (
              <MobileCompactCard
                key={item.id}
                item={item}
                isActive={selectedItem?.id === item.id}
                onClick={() => setSelectedId(item.id)}
              />
            ))}
          </div>

          {/* Detail panel below */}
          <div className="border-2 border-foreground bg-background shadow-brutal p-5 sm:p-6">
            <AnimatePresence mode="wait">
              {selectedItem && <AchievementDetail item={selectedItem} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
