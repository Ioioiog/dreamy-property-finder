import { Filters } from '@/types/property';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import FilterButton from './FilterButton';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters
}: SearchAndFilterProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-property-stone">
          Proprietăți Disponibile
        </h2>
        
        <div className="w-full md:w-auto flex flex-wrap gap-4">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
          />
          <FilterButton 
            showFilters={showFilters}
            onToggleFilters={onToggleFilters}
          />
        </div>
      </div>
    </motion.div>
  );
}