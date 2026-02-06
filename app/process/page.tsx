"use client";

import { CleanGridBackground } from "@/components/ui/bgRipple";
import { ProcessStep, processSteps } from "@/lib/data/process";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, Wrench, X } from "lucide-react";
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

// Custom Node Component - Responsive
const ProcessNode = ({ data }: { data: { step: ProcessStep; theme: string } }) => {
  const { step, theme } = data;
  const isDark = theme !== "light";

  return (
    <div
      className="px-3 py-2.5 sm:px-5 sm:py-4 rounded-lg sm:rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing min-w-[120px] sm:min-w-[160px] max-w-[140px] sm:max-w-[180px]"
      style={{
        background: isDark ? "rgba(17,17,17,0.9)" : "rgba(255,255,255,0.9)",
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-primary/50 !border-none !w-1.5 !h-1.5 sm:!w-2 sm:!h-2" />
      
      {/* Step Number */}
      <div className="text-[8px] sm:text-[9px] font-bold text-primary mb-0.5 sm:mb-1">
        STEP {step.id.padStart(2, "0")}
      </div>
      
      {/* Title */}
      <div className="text-[10px] sm:text-xs font-semibold text-foreground mb-0.5 sm:mb-1 leading-tight">
        {step.title}
      </div>
      
      {/* Duration */}
      <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-muted-foreground">
        <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
        {step.duration}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="!bg-primary/50 !border-none !w-1.5 !h-1.5 sm:!w-2 sm:!h-2" />
    </div>
  );
};

const nodeTypes = {
  process: ProcessNode,
};

// Responsive node positions
const getNodes = (theme: string, isMobile: boolean): Node[] => {
  const steps = processSteps;
  const xOffset = isMobile ? 120 : 200;
  const xSpread = isMobile ? 100 : 120;
  const yGap = isMobile ? 80 : 100;
  
  return [
    { id: "1", type: "process", data: { step: steps[0], theme }, position: { x: xOffset, y: 0 } },
    { id: "2", type: "process", data: { step: steps[1], theme }, position: { x: xOffset - xSpread, y: yGap } },
    { id: "3", type: "process", data: { step: steps[2], theme }, position: { x: xOffset + xSpread, y: yGap } },
    { id: "4", type: "process", data: { step: steps[3], theme }, position: { x: xOffset, y: yGap * 2 } },
    { id: "5", type: "process", data: { step: steps[4], theme }, position: { x: xOffset - xSpread, y: yGap * 3 } },
    { id: "6", type: "process", data: { step: steps[5], theme }, position: { x: xOffset + xSpread, y: yGap * 3 } },
    { id: "7", type: "process", data: { step: steps[6], theme }, position: { x: xOffset, y: yGap * 4 } },
    { id: "8", type: "process", data: { step: steps[7], theme }, position: { x: xOffset, y: yGap * 5 } },
  ];
};

// Edge connections
const getEdges = (theme: string): Edge[] => {
  const isBW = theme === "bw";
  const isDark = theme !== "light";
  const color = isBW
    ? "rgba(255,255,255,0.3)"
    : isDark
    ? "rgba(255,137,6,0.4)"
    : "rgba(255,137,6,0.6)";

  const edgeStyle = {
    style: { stroke: color, strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color, width: 10, height: 10 },
    animated: true,
  };

  return [
    { id: "e1-2", source: "1", target: "2", ...edgeStyle },
    { id: "e1-3", source: "1", target: "3", ...edgeStyle },
    { id: "e2-4", source: "2", target: "4", ...edgeStyle },
    { id: "e3-4", source: "3", target: "4", ...edgeStyle },
    { id: "e4-5", source: "4", target: "5", ...edgeStyle },
    { id: "e4-6", source: "4", target: "6", ...edgeStyle },
    { id: "e5-7", source: "5", target: "7", ...edgeStyle },
    { id: "e6-7", source: "6", target: "7", ...edgeStyle },
    { id: "e7-8", source: "7", target: "8", ...edgeStyle },
  ];
};

// Detail Side Panel - Full screen on mobile
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
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        />

        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[90%] sm:max-w-md bg-background/98 backdrop-blur-xl border-l border-border/30 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-foreground/5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-5 sm:p-6 pt-16">
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="text-base sm:text-lg font-bold text-primary">
                  {step.id.padStart(2, "0")}
                </span>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">{step.title}</h2>
                <span className="text-xs text-primary">{step.duration}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 sm:mb-8">
              {step.description}
            </p>

            <section className="mb-6 sm:mb-8">
              <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 sm:mb-4">
                What We Do
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {step.details.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-2.5 sm:gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </section>

            {step.tools && (
              <section className="mb-6 sm:mb-8">
                <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2">
                  <Wrench className="w-3 h-3" />
                  Tools & Tech
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs text-foreground/70 bg-foreground/5 rounded-full border border-border/30"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {step.outcomes && (
              <section>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  Deliverables
                </h3>
                <div className="grid gap-2">
                  {step.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-center gap-2.5 sm:gap-3 text-sm text-muted-foreground">
                      <span className="w-3 sm:w-4 h-px bg-primary" />
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

  // Detect mobile
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

      {/* Header - Responsive */}
      <header className="absolute top-16 sm:top-20 left-0 right-0 z-30 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Tap hint on mobile */}
      {isMobile && (
        <div className="absolute top-28 left-0 right-0 z-20 text-center">
          <span className="text-[10px] text-muted-foreground/50">
            Tap any step for details • Pinch to zoom
          </span>
        </div>
      )}

      {/* ReactFlow Canvas */}
      <div className="absolute inset-0 pt-20 sm:pt-16">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: isMobile ? 0.2 : 0.3 }}
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
              className="!bg-transparent !border-none !shadow-none [&>button]:!bg-foreground/5 [&>button]:!border-none [&>button]:!text-foreground/30 [&>button:hover]:!text-foreground/60 [&>button]:!rounded-md"
            />
          )}
        </ReactFlow>
      </div>

      <DetailPanel step={selectedStep} isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </div>
  );
}
