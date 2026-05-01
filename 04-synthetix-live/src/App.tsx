import { useState } from "react";
import TradingChart from "./components/chart/TradingChart";
import Header from "./components/Header";
import { useTradingSocket } from "./hooks/useTradingSocket";
import { ASSETS_CONFIG, type Timeframe } from "./types/trading";

function App() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1m");
  const [selectedSymbol, setSelectedSymbol] = useState("R_100");
  const { connected } = useTradingSocket(selectedSymbol, timeframe);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleTimeframe = (tf: Timeframe) => {
    setTimeframe(tf);
  };

  return (
    <main className="h-screen flex flex-col bg-black text-white overflow-hidden font-sans">
      {/* HEADER */}
      <Header
        isConnected={connected}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* OVERLAY MOBILE : Ferme le menu en cliquant à côté */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* BARRE LATÉRALE */}
        <aside
          className={`
            fixed md:relative inset-y-0 left-0 z-50 
            ${isSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0 w-64"}
            border-r border-slate-800 bg-[#0b0e11] 
            flex flex-col overflow-hidden transition-transform duration-300 ease-in-out md:flex
          `}
        >
          {/* Titre Sidebar */}
          <div className="flex justify-between items-center p-4 border-b border-slate-800/50">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              Marchés Synthétiques
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          {/* Liste des actifs */}
          <nav className="flex-1 overflow-y-auto custom-scrollbar">
            {ASSETS_CONFIG.map((asset) => (
              <button
                key={asset.symbol}
                onClick={() => {
                  setSelectedSymbol(asset.symbol);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 border-b border-slate-800/30 transition-all group ${
                  selectedSymbol === asset.symbol
                    ? "bg-slate-900 border-l-2 border-l-cyan-500"
                    : "hover:bg-slate-900/50"
                }`}
              >
                <div className={`text-[10px] uppercase font-mono mb-0.5 ${
                    selectedSymbol === asset.symbol ? "text-cyan-500" : "text-slate-500"
                }`}>
                  {asset.category}
                </div>
                <div className={`text-sm font-bold ${
                    selectedSymbol === asset.symbol ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                }`}>
                  {asset.label}
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* ZONE GRAPHIQUE */}
        <section className="flex-1 flex flex-col bg-black overflow-hidden relative min-w-0">
          <div className={`flex-1 w-full h-full transition-opacity duration-500 ${!connected ? "opacity-50" : "opacity-100"}`}>
            <TradingChart
              symbol={selectedSymbol}
              timeframe={timeframe}
              changeTimeframe={handleTimeframe}
            />
          </div>

          {/* Indicateur de chargement discret si déconnecté */}
          {!connected && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500/50 text-xs font-mono animate-pulse uppercase tracking-widest">
              Connecting to Stream...
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;