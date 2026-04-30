import TradingChart from "./components/chart/TradingChart";
// import { useTradingSocket } from "./hooks/useTradingSocket";

function App() {
  // const { isConnected } = useTradingSocket("R_100"); // Volatility 100

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-mono font-bold text-cyan-400">
        Volatility 100 Index
      </h1>

      <TradingChart symbol={"R_100"} />
    </main>
  );
}

export default App;
