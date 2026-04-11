import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  value: string;
  onChange: (newValue: string) => void;
}

export const Header = ({ value, onChange }: HeaderProps) => {
  return (
    <div>
      {/** Bare de titre */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-3xl font-bold tracking-tight">
          Cine Fetch Engine
        </h1>
        <button className="p-2 text-slate-400 rounded-full hover:bg-slate-800 hover:text-white">
          <Moon size={25} />
        </button>
      </div>

      {/** La bare de recherche */}
      <input
        className="w-full p-4 mb-8 rounded-lg border text-white bg-slate-800 border-slate-700 focus:outiline-non focus:ring-2 focus:ring-cyan-500"
        type="text"
        placeholder="Rechercher un film (ex: Batman, Titanic)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
