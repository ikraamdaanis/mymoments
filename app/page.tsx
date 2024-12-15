"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { Timeline } from "components/Timeline";

export default function Home() {
  return (
    <div>
      <main>
        <ReactFlowProvider>
          <Timeline />
        </ReactFlowProvider>
      </main>
    </div>
  );
}
