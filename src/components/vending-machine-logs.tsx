interface VendingMachineLogsProps {
  logs: string[];
}

export function VendingMachineLogs({ logs }: VendingMachineLogsProps) {
  return (
    <div data-testid="logs" className="logs">
      {logs.map((log, index) => (
        <div key={log}>{log}</div>
      ))}
    </div>
  );
}
