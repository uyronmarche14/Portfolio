"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { FilterTabs } from "@/components/ui/FilterTabs";

import { C, Panel, Text, VisualFrame } from "../ExperienceVisualKit";
import { AUTO_CHIP_CLASS } from "../useAutoplay";

const ROLES = ["Supplier", "Checker", "Approver"] as const;
type Role = (typeof ROLES)[number];

/** Status 0 draft, 1 submitted, 2 reviewed, 3 approved. Each move is allowed for exactly one role. */
const STEPS: { from: number; role: Role; action: string; log: string }[] = [
  { from: 0, role: "Supplier", action: "Submit form", log: "supplier form submitted" },
  { from: 1, role: "Checker", action: "Mark reviewed", log: "checker reviewed the submission" },
  { from: 2, role: "Approver", action: "Approve", log: "approver approved the request" },
];
const NODES = [
  { x: 82, label: "Submitted", at: 1 },
  { x: 244, label: "Reviewed", at: 2 },
  { x: 406, label: "Approved", at: 3 },
];
const TIMES = ["11:31", "11:40", "11:42"];
const roleFor = (status: number): Role => STEPS[status]?.role ?? "Supplier";

/** Beyondgen: a role-gated approval workflow. Pick a role, act when it is that role's turn, and the audit log records each step. */
export const BeyondgenVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [status, setStatus] = useState(0);
  const [manualRole, setManualRole] = useState<Role>("Supplier");
  const [auto, setAuto] = useState(true);
  // while it plays by itself the acting role always matches the step; once you take over, the role is whatever you picked
  const role: Role = auto ? roleFor(status) : manualRole;

  // while nobody has touched it, play the workflow through: the right role acts each step, then it restarts
  useEffect(() => {
    if (!auto || reduce || !inView) return;
    const timer = window.setInterval(() => setStatus((s) => (s >= 3 ? 0 : s + 1)), 2300);
    return () => window.clearInterval(timer);
  }, [auto, reduce, inView]);

  const step = STEPS[status];
  const myTurn = step?.role === role;
  const done = status >= 3;

  const act = () => {
    setAuto(false);
    if (done) {
      setStatus(0);
      setManualRole("Supplier");
      return;
    }
    if (!myTurn) return;
    const next = status + 1;
    setStatus(next);
    setManualRole(roleFor(next));
  };

  return (
    <div ref={ref} className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <FilterTabs<Role>
          label="Acting as"
          className="pb-0"
          value={role}
          onChange={(r) => {
            setAuto(false);
            setManualRole(r);
          }}
          items={ROLES.map((r) => ({ key: r, label: r }))}
        />
        {!auto && (
          <button type="button" onClick={() => setAuto(true)} className={AUTO_CHIP_CLASS}>
            Auto
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1">
        <VisualFrame>
          <Panel title="APPROVAL WORKFLOW" tag="synthetic sample" h={300}>
            <path d="M82 100H406" stroke={C.line} strokeWidth={3} strokeLinecap="round" />
            <motion.rect
              x={82}
              y={98.5}
              height={3}
              rx={1.5}
              fill={C.accent}
              initial={false}
              animate={{ width: (Math.max(0, status - 1) / 2) * 324 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            {NODES.map((n) => {
              const on = status >= n.at;
              return (
                <g key={n.label}>
                  <circle cx={n.x} cy={100} r={20} fill={C.paper} stroke={C.bar} strokeWidth={1.5} />
                  <motion.circle cx={n.x} cy={100} r={20} fill={C.accent} initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.3 }} />
                  <motion.path
                    d={`m${n.x - 7} 100 5 5 10-11`}
                    stroke={C.onAccent}
                    strokeWidth={2.4}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={false}
                    animate={{ opacity: on ? 1 : 0 }}
                  />
                  <Text x={n.x} y={144} size={12} anchor="middle" opacity={on ? 0.95 : 0.6}>{n.label}</Text>
                </g>
              );
            })}

            <Text x={22} y={186} size={11} opacity={0.55}>AUDIT LOG</Text>
            <path d="M22 198H466" stroke={C.line} />
            <AnimatePresence initial={false}>
              {STEPS.slice(0, status).map((s, i) => (
                <motion.g key={s.log} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <circle cx={30} cy={222 + i * 28} r={4} fill={i === status - 1 ? C.accent : C.bar} />
                  <Text x={48} y={226 + i * 28} size={13} opacity={0.85}>{s.log}</Text>
                  <Text x={466} y={226 + i * 28} size={12} anchor="end" opacity={0.45}>{TIMES[i]}</Text>
                </motion.g>
              ))}
            </AnimatePresence>
            {status === 0 && <Text x={22} y={226} size={12} opacity={0.45}>No activity yet</Text>}
          </Panel>
        </VisualFrame>
      </div>

      <div className="flex min-h-[2.5rem] items-center justify-between gap-3">
        <p className="text-xs leading-relaxed text-foreground/70">
          {done
            ? "Approved. Every step above is in the audit log."
            : myTurn
              ? `Your turn as ${role}.`
              : `Waiting for the ${step?.role.toLowerCase()}. As ${role}, you cannot do this step.`}
        </p>
        <button
          type="button"
          onClick={act}
          disabled={!done && !myTurn}
          className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:opacity-40"
        >
          {done ? "Start over" : step?.action}
        </button>
      </div>
    </div>
  );
};
