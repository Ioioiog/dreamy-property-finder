import { Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface FilterButtonProps {
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function FilterButton({ showFilters, onToggleFilters }: FilterButtonProps) {
  return (
    <motion.button
      onClick={onToggleFilters}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-expanded={showFilters}
      aria-controls="filters-panel"
    >
      <Filter size={20} />
      Filtre
    </motion.button>
  );
}