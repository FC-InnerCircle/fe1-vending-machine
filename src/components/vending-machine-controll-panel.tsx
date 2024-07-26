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
    <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md gap-2">
      <input
        type="number"
        className="w-32 p-2 text-center"
        name="금액"
        placeholder="금액 입력"
        value={value}
        onChange={onChangeNumber}
      />
      <div className="flex gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onInsert}
        >
          투입
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onReturn}
        >
          반환
        </button>
      </div>
    </div>
  );
}
