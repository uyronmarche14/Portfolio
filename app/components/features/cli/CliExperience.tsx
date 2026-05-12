"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ChevronRight, Eraser, TerminalSquare } from "lucide-react";

import { CleanGridBackground } from "@/components/ui/bgRipple";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Separator } from "@/components/ui/shadcn/separator";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { portfolioKnowledge } from "@/lib/data/portfolioKnowledge";
import {
  cliCommands,
  getCliCommand,
  getCliInitialOutput,
} from "@/lib/portfolioExperience";
import type { CliCommandResult } from "@/lib/types";

interface TerminalEntry {
  id: string;
  command?: string;
  result: CliCommandResult;
}

const starterCommands = ["help", "projects", "project solace-hotel", "contact"];

const asciiRon = String.raw`██████╗  ██████╗ ███╗   ██╗
██╔══██╗██╔═██╗████╗  ██║
██████╔╝██║   ██║██╔██╗ ██║
██╔══██╗██║   ██║██║╚██╗██║
██║  ██║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝`;

const bootChecks = [
  "identity profile loaded",
  "project index mounted",
  "command registry ready",
  "portfolio shell online",
];

const createEntry = (result: CliCommandResult, command?: string): TerminalEntry => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  command,
  result,
});

export default function CliExperience() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [entries, setEntries] = useState<TerminalEntry[]>(
    getCliInitialOutput().map((result) => createEntry(result))
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = useMemo(
    () => cliCommands.map((item) => item.name),
    []
  );

  const runCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    const [commandName, ...args] = trimmed.split(/\s+/);
    const normalizedName = commandName.toLowerCase();

    if (normalizedName === "clear") {
      setEntries([]);
      setCommand("");
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(null);
      return;
    }

    const selectedCommand = getCliCommand(normalizedName);
    const result =
      selectedCommand?.execute(args, { knowledge: portfolioKnowledge }) || {
        title: "Unknown Command",
        lines: [
          `Command "${trimmed}" is not supported yet.`,
          `Try one of: ${availableCommands.join(", ")}`,
        ],
        tone: "warning" as const,
        suggestions: starterCommands,
      };

    setEntries((prev) => [...prev, createEntry(result, trimmed)]);
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);
    setCommand("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(command);
  };

  const handleHistoryNavigation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!history.length) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setCommand(history[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === null) {
        return;
      }

      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setCommand("");
        return;
      }

      setHistoryIndex(nextIndex);
      setCommand(history[nextIndex]);
    }
  };

  return (
    <div className="relative min-h-screen bg-background px-4 pb-[150px] pt-28 sm:px-6 lg:px-8">
      <CleanGridBackground className="fixed inset-0 z-0" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300"
            >
              portfolio shell v1
            </Badge>
            <p className="max-w-3xl font-mono text-sm leading-relaxed text-muted-foreground">
              A dedicated terminal-style mode for exploring projects, experience, process, resume, and contact details.
            </p>
          </div>

          <Button asChild variant="outline" className="w-fit border-foreground/10 bg-background/70">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back To Portfolio
            </Link>
          </Button>
        </div>

        <div className="border-y-2 border-foreground bg-foreground/5 py-4 -mx-4 px-4 sm:mx-0 sm:px-6 sm:border-2 sm:shadow-brutal">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <h2 className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-foreground">
                <TerminalSquare className="h-4 w-4 text-primary" />
                ron@portfolio:~ /cli
              </h2>
            </div>

            <div className="hidden font-mono text-xs uppercase tracking-widest text-foreground/50 sm:block">
              local-only portfolio terminal
            </div>
          </div>
        </div>

        <div className="border-2 border-foreground bg-foreground/5 p-4 sm:p-5">
          <pre className="min-w-[540px] font-mono text-[10px] leading-[1.35] text-foreground sm:text-xs">
            {asciiRon}
          </pre>
          <div className="mt-4 font-mono text-sm uppercase tracking-[0.35em] text-primary sm:text-base font-bold">
            RON MARCHE RHYSS Q UY
          </div>
          <div className="mt-2 font-mono text-xs text-foreground/50 uppercase tracking-wider font-bold">
            boot sequence complete • terminal ready • run <span className="text-primary">help</span> to begin
          </div>
        </div>

        <div className="mt-2 grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="border-2 border-foreground bg-foreground/5 p-4">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-bold">
              Startup Check
            </div>
            <div className="space-y-2 font-mono text-sm text-foreground uppercase font-bold text-xs">
              {bootChecks.map((check) => (
                <div key={check} className="flex items-center gap-2">
                  <span className="text-primary">[ok]</span>
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-foreground bg-foreground/5 p-4">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-bold">
              Session
            </div>
            <div className="space-y-2 font-mono text-xs text-foreground uppercase font-bold">
              <div className="flex justify-between gap-4">
                <span className="text-foreground/50">identity</span>
                <span>ron</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-foreground/50">commands</span>
                <span>{cliCommands.length}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-foreground/50">focus</span>
                <span>portfolio</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-foreground/50">route</span>
                <span>/cli</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-y-2 border-foreground bg-background py-4 -mx-4 px-4 sm:mx-0 sm:px-6 sm:border-2">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-bold">
            Quick Commands
          </div>
          <div className="flex flex-wrap gap-2">
            {starterCommands.map((preset) => (
              <Button
                key={preset}
                type="button"
                variant="outline"
                size="sm"
                className="h-8 border-2 border-foreground bg-background font-mono text-[11px] text-foreground uppercase tracking-wider font-bold shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal hover:bg-foreground hover:text-background transition-all duration-150 rounded-none"
                onClick={() => runCommand(preset)}
              >
                $ {preset}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-5 font-mono text-sm pt-4">
          {entries.map((entry) => (
            <div key={entry.id} className="space-y-2">
              {entry.command && (
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span className="text-foreground/50">ron@portfolio:~$</span>
                  <ChevronRight className="h-4 w-4" />
                  <span>{entry.command}</span>
                </div>
              )}

              <div className="border-2 border-foreground bg-foreground/5 p-4">
                <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/50">
                  {entry.result.title}
                </div>
                {entry.result.lines.length > 0 ? (
                  <div className="space-y-1.5 text-xs font-bold leading-relaxed text-foreground">
                    {entry.result.lines.map((line, index) => (
                      <p key={`${entry.id}-${index}`} className="whitespace-pre-wrap break-words">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-foreground/50 font-bold uppercase tracking-widest">terminal cleared</p>
                )}

                {entry.result.suggestions?.length ? (
                  <>
                    <Separator className="my-3 bg-foreground/20" />
                    <div className="flex flex-wrap gap-2">
                      {entry.result.suggestions.map((suggestion) => (
                        <button
                          key={`${entry.id}-${suggestion}`}
                          type="button"
                          className="border-2 border-foreground bg-background px-2.5 py-1 font-mono text-[11px] text-foreground uppercase font-bold shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal hover:bg-foreground hover:text-background transition-all duration-150"
                          onClick={() => runCommand(suggestion)}
                        >
                          $ {suggestion}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-foreground bg-background p-4 sm:p-6 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-primary font-bold">
                {">"}
              </span>
              <Input
                ref={inputRef}
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                onKeyDown={handleHistoryNavigation}
                placeholder="Type a command like help or project solace-hotel"
                className="h-11 border-2 border-foreground bg-background pl-8 font-mono text-xs font-bold uppercase tracking-widest text-foreground placeholder:text-foreground/30 focus-visible:ring-primary shadow-brutal-sm rounded-none"
                aria-label="Terminal command input"
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="border-2 border-foreground bg-background font-mono text-xs uppercase font-bold text-foreground shadow-brutal-sm hover:bg-foreground hover:text-background hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all duration-150 rounded-none"
                onClick={() => {
                  setEntries([]);
                  setCommand("");
                  inputRef.current?.focus();
                }}
              >
                <Eraser className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button
                type="submit"
                className="border-2 border-foreground bg-primary font-mono text-xs uppercase font-bold text-background shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal hover:bg-primary/90 transition-all duration-150 rounded-none"
              >
                Run
                <span className="ml-2 inline-block animate-pulse">_</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
