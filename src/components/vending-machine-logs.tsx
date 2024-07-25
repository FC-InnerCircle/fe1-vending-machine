interface VendingMachineLogsProps {
  logs: string[];
}

export function VendingMachineLogs({ logs }: VendingMachineLogsProps) {
  return (
    <div
      data-testid="logs"
      className="logs flex flex-col gap-2 p-4 bg-gray-100 rounded-lg shadow-md h-48 overflow-y-auto"
    >
      {logs.map((log, index) => (
        <div key={log + index}>{log}</div>
      ))}
    </div>
  );
}
