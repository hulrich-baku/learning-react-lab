import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  value: string;
  onChange: (newValue: string) => void;
  theme: string;
  toggleTheme: () => void;
}

export const Header = ({
  value,
  onChange,
  theme,
  toggleTheme,
}: HeaderProps) => {
  return (
    <div>
      {/** Bare de titre */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-slate-700 dark:text-slate-100 text-3xl font-bold tracking-tight transition-colors duration-500">
          Cine Fetch Engine
        </h1>
        <button
          className="p-2 text-slate-500 dark:text-slate-400 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white transition-colors duration-500"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Moon size={25} /> : <Sun size={25} />}
        </button>
      </div>

      {/** La bare de recherche */}
      <input
        className="w-full p-4 mb-8 rounded-lg border text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 border-slate-600 dark:border-slate-700 focus:outiline-none focus:ring-2 focus:ring-cyan-100 dark:focus:ring-cyan-500"
        type="text"
        placeholder="Rechercher un film (ex: Batman, Titanic)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
