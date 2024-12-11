import { motion } from 'framer-motion';

interface NoResultsProps {
  onResetFilters: () => void;
}

export default function NoResults({ onResetFilters }: NoResultsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <h3 className="text-xl font-semibold text-property-stone mb-2">
        Nu am găsit proprietăți care să corespundă criteriilor tale
      </h3>
      <p className="text-property-muted mb-4">
        Încearcă să ajustezi filtrele sau să ștergi termenul de căutare
      </p>
      <motion.button
        onClick={onResetFilters}
        className="px-4 py-2 bg-property-gold text-white rounded-md hover:bg-property-stone transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Resetează filtrele
      </motion.button>
    </motion.div>
  );
}