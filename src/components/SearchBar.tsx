import { useState, FormEvent } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSearch(value.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex items-center w-full bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500/20 ${isLoading ? 'opacity-80' : ''}`}
    >
      <div className="absolute left-4 text-slate-400">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isLoading}
        placeholder="e.g. Best gaming laptop under $1500 for students"
        className="w-full h-16 pl-12 pr-40 bg-transparent text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!value.trim() || isLoading}
        className="absolute right-2 h-12 px-6 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
      >
        Recommend
      </button>
    </form>
  );
}
