import { ASSETS_CONFIG, type Asset } from "../../types/trading";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSymbol: Asset;
  onSelectSymbol: (symbol: Asset) => void;
}

const Sidebar = ({ isOpen, onClose, selectedSymbol, onSelectSymbol }: SidebarProps) => {
  return (
    <>
      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden" 
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-50 
          ${isOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0 w-62"}
          border-r border-slate-800 bg-[#0b0e11] 
          flex flex-col overflow-hidden transition-transform duration-300 ease-in-out md:flex
        `}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-800/50">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            Marchés Synthétiques
          </span>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white p-1">
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          {ASSETS_CONFIG.map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => {
                onSelectSymbol(asset);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 border-b border-slate-800/30 transition-all group ${
                selectedSymbol === asset
                  ? "bg-slate-900 border-l-2 border-l-cyan-500"
                  : "hover:bg-slate-900/50"
              }`}
            >
              <div className={`text-[10px] uppercase font-mono mb-0.5 ${
                  selectedSymbol === asset ? "text-cyan-500" : "text-slate-500"
              }`}>
                {asset.category}
              </div>
              <div className={`text-sm font-bold ${
                  selectedSymbol === asset ? "text-white" : "text-slate-400 group-hover:text-slate-200"
              }`}>
                {asset.label}
              </div>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;