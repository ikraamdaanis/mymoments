"use client";

import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import { TimelineEvent } from "types";

function Node({ data }: { data: TimelineEvent }) {
  return (
    <div className="px-4 py-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex flex-col gap-1">
        <span
          className={`text-xs ${
            data.category === "life-event" ? "text-purple-600" : "text-blue-600"
          }`}
        >
          {data.date.toLocaleDateString()}
        </span>
        <h3 className="font-semibold  text-zinc-800">{data.title}</h3>
        <p className="text-sm text-gray-600">{data.description}</p>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export const TimelineNode = memo(Node);
