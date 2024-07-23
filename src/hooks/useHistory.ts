import { useState } from "react";

const useHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  const addHistory = (newHistory: string) => {
    setHistory([...history, newHistory]);
  };

  return {
    history,
    addHistory,
  };
};

export default useHistory;
