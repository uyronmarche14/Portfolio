"use client";

import { useMemo, useState } from "react";
import ReactFlow, { Background, Controls, MarkerType, Position, type Edge, type Node } from "reactflow";
import "reactflow/dist/style.css";

import type { ProjectArchitecture } from "@/lib/data/architectures";

/** Stable references: React Flow warns in development when these props are recreated on every render. */
const NODE_TYPES = {};
const EDGE_TYPES = {};

/** Read-only, code-split diagram. Selecting a node shows its explanation; a text list below covers keyboard and screen-reader users. */
export default function ArchitectureDiagram({ architecture }: { architecture: ProjectArchitecture }) {
  const [selectedId, setSelectedId] = useState(architecture.nodes[0]?.id);

  const nodes = useMemo<Node[]>(
    () =>
      architecture.nodes.map((node) => ({
        id: node.id,
        position: { x: node.x, y: node.y },
        data: { label: `${node.label} (${node.group})` },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: {
          background: "rgb(var(--card))",
          color: "rgb(var(--foreground))",
          border: `1px solid rgb(var(--${node.id === selectedId ? "primary" : "border"}))`,
          borderRadius: 8,
          padding: 12,
          width: 170,
          fontSize: 13,
        },
      })),
    [architecture.nodes, selectedId]
  );

  const edges = useMemo<Edge[]>(
    () =>
      architecture.edges.map((edge) => ({
        id: `${edge.from}-${edge.to}`,
        source: edge.from,
        target: edge.to,
        label: edge.label,
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: "rgb(var(--secondary))" },
        labelStyle: { fill: "rgb(var(--secondary))", fontSize: 11 },
        labelBgStyle: { fill: "rgb(var(--background))" },
      })),
    [architecture.edges]
  );

  const selected = architecture.nodes.find((node) => node.id === selectedId);

  return (
    <div>
      <div className="h-64 w-full overflow-hidden rounded-lg border border-foreground/15 bg-background" role="region" aria-label="Interactive architecture diagram. The same information is listed as text below.">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodeTypes={NODE_TYPES}
          edgeTypes={EDGE_TYPES}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          proOptions={{ hideAttribution: true }}
          onNodeClick={(_, node) => setSelectedId(node.id)}
        >
          <Background gap={24} color="rgb(48 54 55)" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <p className="mt-4 text-sm text-foreground/70">{architecture.summary}</p>
      <ul className="mt-3 divide-y divide-foreground/10 border-y border-foreground/10">
        {architecture.nodes.map((node) => (
          <li key={node.id}>
            <button
              type="button"
              aria-pressed={node.id === selectedId}
              onClick={() => setSelectedId(node.id)}
              className="flex w-full min-h-11 items-baseline gap-3 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="w-28 shrink-0 font-mono text-xs text-primary">{node.group}</span>
              <span className="text-sm font-medium text-foreground">{node.label}</span>
            </button>
          </li>
        ))}
      </ul>
      {selected && (
        <p aria-live="polite" className="mt-3 text-sm leading-relaxed text-foreground/80">
          <span className="font-medium text-foreground">{selected.label}: </span>
          {selected.detail}
        </p>
      )}
    </div>
  );
}
