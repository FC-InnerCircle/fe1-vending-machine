interface VendingMachineDisplayPanelProps {
  displayText: string;
}

export function VendingMachineDisplayPanel({
  displayText,
}: VendingMachineDisplayPanelProps) {
  return (
    <div
      data-testid="display"
      className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md gap-2 bg-green-300"
    >
      {displayText}
    </div>
  );
}
