interface VendingMachineDisplayPanelProps {
  displayText: string;
}

export function VendingMachineDisplayPanel({
  displayText,
}: VendingMachineDisplayPanelProps) {
  return (
    <div data-testid="display" className="display">
      {displayText}
    </div>
  );
}
