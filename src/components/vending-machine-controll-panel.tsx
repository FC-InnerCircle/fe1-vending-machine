interface VendingMachineControlPanelProps {
  value: string;
  onChangeNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInsert: () => void;
  onReturn: () => void;
}

export function VendingMachineControlPanel({
  onChangeNumber,
  onInsert,
  onReturn,
  value,
}: VendingMachineControlPanelProps) {
  return (
    <div>
      <input
        type="number"
        name="금액"
        placeholder="금액 입력"
        value={value}
        onChange={onChangeNumber}
      />
      <button onClick={onInsert}>투입</button>
      <button onClick={onReturn}>반환</button>
    </div>
  );
}
