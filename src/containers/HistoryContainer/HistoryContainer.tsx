import { createRef, useContext, useEffect } from "react";
import VendingMachineContext from "../../context/VendingMachineContext";
import { Message } from "../../components";

const HistoryContainer = () => {
  const { history } = useContext(VendingMachineContext);
  const divRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [divRef, history]);

  return (
    <div
      ref={divRef}
      className="w-full h-full overflow-auto border-2 p-1 border-black"
    >
      {history.map((h) => (
        <Message key={h}>{h}</Message>
      ))}
    </div>
  );
};

export default HistoryContainer;
