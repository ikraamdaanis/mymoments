"use client";

import {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeTypes,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TimelineNode } from "components/TimelineNode";
import { useCallback, useMemo } from "react";
import { TimelineEvent } from "types";

const nodeTypes: NodeTypes = {
  timelineEvent: TimelineNode,
};

const events: TimelineEvent[] = [
  {
    id: "0",
    date: new Date("2000-12-14"),
    title: "Birth",
    description: "The day I was born",
    category: "life-event",
  },
  {
    id: "1",
    date: new Date("2010-09-01"),
    title: "First Day of School",
    description: "Started school",
    category: "life-event",
  },
  {
    id: "2",
    date: new Date("2023-12-25"),
    title: "Shopping",
    description: "Went to the mall",
    category: "regular-event",
  },
  // Add more events
];

export const Timeline = () => {
  // Handle zooming to specific time periods
  const { setViewport, fitView } = useReactFlow();

  const nodes: Node[] = useMemo(
    () =>
      events.map((event, index) => ({
        id: event.id,
        type: "timelineEvent",
        data: event as unknown as Record<string, unknown>,
        position: {
          x: index * 300,
          y: event.category === "life-event" ? 0 : 100,
        },
      })),
    []
  );

  const edges: Edge[] = useMemo(
    () =>
      events.slice(0, -1).map((event, index) => ({
        id: `e${event.id}-${events[index + 1].id}`,
        source: event.id,
        target: events[index + 1].id,
        type: "smoothstep",
        animated: true,
      })),
    []
  );

  const zoomToYear = useCallback(
    (year: number) => {
      const yearNodes = nodes.filter(
        (node) => new Date(node.data.date as Date).getFullYear() === year
      );

      if (yearNodes.length > 0) {
        const xPositions = yearNodes.map((node) => node.position.x);
        const minX = Math.min(...xPositions);

        setViewport({
          x: minX,
          y: 0,
          zoom: 1.5,
        });
      }
    },
    [nodes, setViewport]
  );

  return (
    <div className="h-screen w-full">
      <div className="h-16 bg-white border-b flex items-center px-4 gap-4">
        <button
          onClick={() => zoomToYear(2023)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Zoom to 2023
        </button>
        <button
          onClick={() => fitView()}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          View All
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-500"
      >
        <Background />
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
};
