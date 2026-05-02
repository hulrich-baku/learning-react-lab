import { MenuIcon } from "lucide-react";

interface HeaderProps {
  isConnected: boolean;
  onMenuClick: () => void;
}

const Header = ({ isConnected, onMenuClick }: HeaderProps) => {
  return (
    <header className="border-b border-slate-800 w-full bg-[#0b0e11] px-6 py-4 flex justify-between">
      <div className="flex gap-2">
        <MenuIcon size={20} onClick={onMenuClick} className="my-auto md:hidden"/>
        <h1 className="text-2xl font-black tracking-tighter text-white">
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
