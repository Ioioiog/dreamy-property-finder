import { useState, useMemo, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Property, Filters } from '@/types/property';
import { propertyData } from '@/data/properties';
import PropertyModal from '@/components/PropertyModal';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyListProps {
  onPropertySelect: (property: Property) => void;
}

export default function PropertyList({ onPropertySelect }: PropertyListProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    rooms: 'all',
    complex: 'all',
    priceRange: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProperties = useMemo(() => {
    return propertyData.filter(property => {
      if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !property.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (filters.status !== 'all' && property.status !== filters.status) {
        return false;
      }

      if (filters.rooms !== 'all' && property.details.rooms !== parseInt(filters.rooms)) {
        return false;
      }

      if (filters.complex !== 'all' && property.location.complex !== filters.complex) {
        return false;
      }

      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (property.price < min || property.price > max) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, filters]);

  const resetFilters = () => {
    setFilters({
      status: 'all',
      rooms: 'all',
      complex: 'all',
      priceRange: 'all'
    });
    setSearchTerm('');
    toast({
      title: "Filtre resetate",
      description: "Toate filtrele au fost resetate cu succes.",
    });
  };

  return (
    <section id="properties" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Caută proprietăți..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-property-gold focus:border-transparent"
                  aria-label="Caută proprietăți"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} aria-hidden="true" />
              </div>
              
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={showFilters}
                aria-controls="filters-panel"
              >
                <Filter size={20} />
                Filtre
              </motion.button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              id="filters-panel"
            >
              <PropertyFilters
                filters={filters}
                onFilterChange={setFilters}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
                onResetFilters={resetFilters}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-t-lg" />
                <div className="p-6 bg-white rounded-b-lg space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewGallery={onPropertySelect}
                onViewDetails={(property) => {
                  setSelectedProperty(property);
                  setShowModal(true);
                }}
              />
            ))}
          </motion.div>
        )}

        {!isLoading && filteredProperties.length === 0 && (
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
              onClick={resetFilters}
              className="px-4 py-2 bg-property-gold text-white rounded-md hover:bg-property-stone transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resetează filtrele
            </motion.button>
          </motion.div>
        )}

        {showModal && selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={() => setShowModal(false)}
            onOpenGallery={() => {
              setShowModal(false);
              onPropertySelect(selectedProperty);
            }}
          />
        )}
      </div>
    </section>
  );
}