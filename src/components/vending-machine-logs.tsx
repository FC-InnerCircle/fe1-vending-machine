import { RefObject, useEffect, useRef } from "react";

interface VendingMachineLogsProps {
  logs: string[];
  logEndRef: RefObject<HTMLDivElement>;
}

export function VendingMachineLogs({
  logs,
  logEndRef,
}: VendingMachineLogsProps) {
  return (
    <div
      data-testid="logs"
      className="logs flex flex-col gap-2 p-4 bg-gray-100 rounded-lg shadow-md h-48 overflow-y-auto"
    >
      {logs.map((log, index) => (
        <div key={log + index}>{log}</div>
      ))}

      <div ref={logEndRef}></div>
    </div>
  );
}
