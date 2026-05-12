"use client";

import { CleanGridBackground } from "@/components/ui/bgRipple";
import { ProcessStep, processSteps } from "@/lib/data/process";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, FileText, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Handle,
  MarkerType,
  Node,
  NodeMouseHandler,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

// Custom Node Component — Brutalist
const ProcessNode = ({ data }: { data: { step: ProcessStep; theme: string } }) => {
  const { step, theme } = data;
  const isDark = theme !== "light";

  return (
    <div
      className="px-3 py-2.5 sm:px-5 sm:py-4 bg-background border-2 border-foreground shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal transition-all duration-150 cursor-grab active:cursor-grabbing min-w-[120px] sm:min-w-[160px] max-w-[140px] sm:max-w-[180px]"
      style={{
        background: isDark ? "rgba(10,10,10,0.95)" : "rgba(255,251,240,0.95)",
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary !border-foreground !border !w-1.5 !h-1.5 sm:!w-2 sm:!h-2" />
      
      {/* Step Number */}
      <div className="font-mono text-[8px] sm:text-[9px] font-bold text-primary uppercase tracking-widest mb-0.5 sm:mb-1">
        Step {step.id.padStart(2, "0")}
      </div>
      
      {/* Title */}
      <div className="font-rawkner text-[10px] sm:text-xs font-bold text-foreground mb-0.5 sm:mb-1 leading-tight uppercase">
        {step.title}
      </div>
      
      {/* Duration */}
      <div className="flex items-center gap-1 font-mono text-[8px] sm:text-[9px] text-foreground/50 uppercase tracking-wider">
        <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
        {step.duration}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="!bg-primary !border-foreground !border !w-1.5 !h-1.5 sm:!w-2 sm:!h-2" />
    </div>
  );
};

const nodeTypes = {
  process: ProcessNode,
};

const PROCESS_LAYOUT = [
  { column: 0, row: 0 },
  { column: -1, row: 1 },
  { column: 1, row: 1 },
  { column: 0, row: 2 },
  { column: -1, row: 3 },
  { column: 1, row: 3 },
  { column: 0, row: 4 },
  { column: -1, row: 5 },
  { column: 1, row: 5 },
  { column: 0, row: 6 },
  { column: -1, row: 7 },
  { column: 1, row: 7 },
];

const PROCESS_CONNECTIONS: Array<[string, string]> = [
  ["1", "2"],
  ["1", "3"],
  ["2", "4"],
  ["3", "4"],
  ["4", "5"],
  ["4", "6"],
  ["5", "7"],
  ["6", "7"],
  ["7", "8"],
  ["7", "9"],
  ["8", "10"],
  ["9", "10"],
  ["10", "11"],
  ["10", "12"],
];

// Responsive node positions
const getNodes = (theme: string, isMobile: boolean): Node[] => {
  const xCenter = isMobile ? 120 : 260;
  const xSpread = isMobile ? 0 : 170;
  const yGap = isMobile ? 88 : 118;

  return processSteps.map((step, index) => {
    const slot = isMobile
      ? { column: 0, row: index }
      : PROCESS_LAYOUT[index] ?? { column: 0, row: index };

    return {
      id: step.id,
      type: "process",
      data: { step, theme },
      position: {
        x: xCenter + slot.column * xSpread,
        y: slot.row * yGap,
      },
    };
  });
};

// Edge connections
const getEdges = (theme: string): Edge[] => {
  const isBW = theme === "bw";
  const isDark = theme !== "light";
  const color = isBW
    ? "rgba(255,255,255,0.5)"
    : isDark
    ? "rgba(255,120,20,0.6)"
    : "rgba(255,107,0,0.7)";

  const edgeStyle = {
    style: { stroke: color, strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color, width: 10, height: 10 },
    animated: true,
  };

  return PROCESS_CONNECTIONS.map(([source, target]) => ({
    id: `e${source}-${target}`,
    source,
    target,
    ...edgeStyle,
  }));
};

// Detail Side Panel — Brutalist
const DetailPanel = ({
  step,
  isOpen,
  onClose,
}: {
  step: ProcessStep | null;
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && step && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60"
        />

        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[90%] sm:max-w-md bg-background border-l-2 border-foreground overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 text-foreground/60 hover:text-foreground transition-colors cursor-pointer border-2 border-foreground hover:bg-foreground hover:text-background"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-5 sm:p-6 pt-16">
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 flex items-center justify-center border-2 border-foreground">
                <span className="font-mono text-base sm:text-lg font-bold text-primary">
                  {step.id.padStart(2, "0")}
                </span>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-rawkner text-foreground uppercase">{step.title}</h2>
                <span className="font-mono text-xs text-primary uppercase tracking-wider">{step.duration}</span>
              </div>
            </div>

            <div className="mb-6 sm:mb-8 space-y-3">
              <p className="text-sm text-foreground/70 leading-relaxed">
                {step.description}
              </p>
              {step.expandedDescription?.map((paragraph) => (
                <p key={paragraph} className="text-sm text-foreground/60 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <section className="mb-6 sm:mb-8">
              <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-3 sm:mb-4">
                What This Phase Defines
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {step.details.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex gap-2.5 sm:gap-3 text-sm text-foreground/60"
                  >
                    <span className="w-2 h-2 bg-primary mt-1.5 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </section>

            {step.tools && (
              <section className="mb-6 sm:mb-8">
                <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Key Inputs
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-xs text-foreground/70 bg-foreground/5 border border-foreground/30 uppercase tracking-wider"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {step.outcomes && (
              <section>
                <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  Outputs
                </h3>
                <div className="grid gap-2">
                  {step.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-center gap-2.5 sm:gap-3 text-sm text-foreground/60">
                      <span className="w-4 h-px bg-primary" />
                      {outcome}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

export default function ProcessPage() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme || "dark";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(getNodes(theme, isMobile));
  const [edges, setEdges, onEdgesChange] = useEdgesState(getEdges(theme));
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    setNodes(getNodes(theme, isMobile));
    setEdges(getEdges(theme));
  }, [theme, isMobile, setNodes, setEdges]);

  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    const step = processSteps.find((s) => s.id === node.id);
    if (step) {
      setSelectedStep(step);
      setPanelOpen(true);
    }
  }, []);

  const isDark = theme !== "light";

  return (
    <div className="h-screen w-screen bg-background text-foreground overflow-hidden">
      <CleanGridBackground className="fixed inset-0 z-0" />

      {/* Header */}
      <header className="absolute left-0 right-0 top-28 z-30 px-4 sm:top-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-foreground/50 hover:text-primary transition-colors duration-150 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-150" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Tap hint on mobile */}
      {isMobile && (
        <div className="absolute left-0 right-0 top-40 z-20 text-center">
          <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-wider">
            Tap any phase for details • Pinch to zoom
          </span>
        </div>
      )}

      {/* ReactFlow Canvas */}
      <div className="absolute inset-0 pt-24 sm:pt-20">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: isMobile ? 0.18 : 0.24 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={!isMobile}
          nodesConnectable={false}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnScroll={false}
          minZoom={0.5}
          maxZoom={2}
        >
          <Background
            color={isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"}
            gap={isMobile ? 30 : 40}
            size={1}
          />
          {!isMobile && (
            <Controls
              showInteractive={false}
              className="!bg-transparent !border-none !shadow-none [&>button]:!bg-foreground/5 [&>button]:!border-2 [&>button]:!border-foreground/20 [&>button]:!text-foreground/30 [&>button:hover]:!text-foreground/60 [&>button:hover]:!border-foreground/40"
            />
          )}
        </ReactFlow>
      </div>

      <DetailPanel step={selectedStep} isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </div>
  );
}
