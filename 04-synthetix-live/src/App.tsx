import { useState } from "react";
import TradingChart from "./components/chart/TradingChart";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import { useTradingSocket } from "./hooks/useTradingSocket";
import { ASSETS_CONFIG, type Asset, type Timeframe } from "./types/trading";

function App() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1m");
  const [selectedSymbol, setSelectedSymbol] = useState<Asset>(ASSETS_CONFIG[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { connected } = useTradingSocket(selectedSymbol, timeframe);

  return (
    <main className="h-screen flex flex-col bg-black text-white overflow-hidden font-sans">
      <Header
        isConnected={connected}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          selectedSymbol={selectedSymbol}
          onSelectSymbol={setSelectedSymbol}
        />

        <section className="flex-1 flex flex-col bg-black overflow-hidden relative min-w-0">
          <div className={`flex-1 w-full h-full transition-opacity duration-500 ${!connected ? "opacity-50" : "opacity-100"}`}>
            <TradingChart
              actif={selectedSymbol}
              timeframe={timeframe}
              changeTimeframe={setTimeframe}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
