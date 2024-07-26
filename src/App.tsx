import BalanceController from "./containers/BalanceControlContainer/BalanceControlContainer";
import BalanceDisplayContainer from "./containers/BalanceDisplayContainer/BalanceDisplayContainer";
import HistoryContainer from "./containers/HistoryContainer/HistoryContainer";
import ProductButtonConainer from "./containers/ProductButtonConainer/ProductButtonConainer";

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <main className="w-full h-full md:h-[400px] flex flex-col md:max-w-3xl md:flex-row">
        <section className="w-full h-1/2 p-6 bg-slate-200 border-0 md:border-2 border-black md:h-full md:w-1/2">
          <BalanceDisplayContainer />
          <ProductButtonConainer />
        </section>
        <section className="w-full h-1/2 p-6 flex flex-col gap-6 md:h-full md:w-1/2">
          <BalanceController />
          <HistoryContainer />
        </section>
      </main>
    </div>
  );
}

export default App;
