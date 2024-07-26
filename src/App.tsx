import { useRef, useState } from "react";
import "./index.css";

const CHEAPEST_PRICE = 300;
const ALL_ITEMS_COUNT = 9;
const GENTLEE = "GT";

const App = () => {
  const [insertValue, setInsertValue] = useState("");
  const [balance, setBalance] = useState(0);
  const [logList, setLogList] = useState([""]);
  const $balanceInput = useRef<HTMLInputElement>(null);

  return (
    <div className="App">
      <main className="max-w-screen-md gap-2 mx-auto lg:flex lg:max-w-screen-lg">
        <div className="p-4 lg:w-1/2 bg-sky-400">
          <input
            ref={$balanceInput}
            readOnly
            type="text"
            className="w-full h-20 mb-6 text-4xl text-center"
            defaultValue={0}
          />
          <div className="grid grid-cols-3 grid-rows-3 gap-3 grind">
            {Array.from(Array(ALL_ITEMS_COUNT)).map((_, idx) => {
              const price = CHEAPEST_PRICE + idx * 100;
              const itemName = `${GENTLEE}${price}`;
              return (
                <button className="h-24 text-2xl bg-slate-200 hover:bg-blue-500 active:bg-purple-800">
                  {itemName}
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-4 bg-yellow-200 lg:w-1/2">
          <form className="grid grid-cols-[3fr_1fr_1fr] gap-2 h-20 mb-6 text-4xl">
            <input value={insertValue} type="text" className="min-w-0 pl-4" />
            <button type="submit" className="text-2xl bg-gray-400 insert_coin ">
              투입
            </button>
            <button
              type="button"
              className="text-2xl bg-gray-400 return_balance"
            >
              반환
            </button>
          </form>
          <ul className="flex flex-col gap-2 w-full h-[312px] p-4 bg-white overflow-auto"></ul>
        </div>
      </main>
    </div>
  );
};

export default App;
