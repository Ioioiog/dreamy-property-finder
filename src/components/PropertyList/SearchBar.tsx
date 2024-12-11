import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative flex-1 md:w-64">
      <input
        type="text"
        placeholder="Caută proprietăți..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-property-gold focus:border-transparent"
        aria-label="Caută proprietăți"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} aria-hidden="true" />
    </div>
  );
}