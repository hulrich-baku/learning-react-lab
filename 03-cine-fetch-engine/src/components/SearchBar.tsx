interface SearchBarProps {
  value: string;
  onChange: (newValue: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div>
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
