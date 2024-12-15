"use client";

import { Timeline } from "components/Timeline";
import { ReactFlowProvider } from "reactflow";

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
