interface HeaderProps {
  isConnected: boolean;
}

const Header = ({ isConnected }: HeaderProps) => {
  return (
    <header className="border-b border-slate-800 w-full bg-[#0b0e11] px-6 py-3 flex justify-between">
      <div>
        <h1 className="text-xl font-black tracking-tighter text-white">
          SYNTHETIX <span className="text-cyan-500">LIVE</span>
        </h1>
      </div>

      {/* INDICATEUR DE STATUT */}
      <div
        className={`w-3 h-3 my-auto ${isConnected ? "bg-cyan-500" : "bg-red-400"} rounded-sm animate-pulse`}
      />
    </header>
  );
};

export default Header;
