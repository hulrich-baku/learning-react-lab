import { useTradingSocket } from "./hooks/useTradingSocket";

function App() {
  const { lastPrice, isConnected } = useTradingSocket("R_100"); // Volatility 100

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="text-sm mb-4">
        Statut : 
        <span className={isConnected ? "text-lime-400" : "text-red-500"}>
          {isConnected ? " ● Connecté 🟢" : " ● Déconnecté 🔴"}
        </span>
      </div>

      <h1 className="text-4xl font-mono font-bold text-cyan-400">
        Volatility 100 Index
      </h1>

      <div className="mt-8 text-6xl font-mono tabular-nums">
        {lastPrice ? lastPrice.toFixed(2) : "Chargement..."}
      </div>
      
      <p className="mt-4 text-slate-500 italic">
        Données en direct via WebSocket
      </p>
    </main>
  );
}

export default App;