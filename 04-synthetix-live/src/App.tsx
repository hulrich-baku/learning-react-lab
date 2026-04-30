import { useState } from "react";
import TradingChart from "./components/chart/TradingChart";
import Header from "./components/Header";
import { useTradingSocket } from "./hooks/useTradingSocket";
import type { Timeframe } from "./types/trading";
// import { useTradingSocket } from "./hooks/useTradingSocket";

function App() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1m");
  const { connected } = useTradingSocket("R_100", timeframe);

  const handleTimeframe = (tf: Timeframe) => {
    setTimeframe(tf);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <Header isConnected={connected} />

      <TradingChart symbol={"R_100"} timeframe={timeframe} changeTimeframe={handleTimeframe} />
    </main>
  );
}

export default App;
