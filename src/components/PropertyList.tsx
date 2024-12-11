import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Property, Filters } from '@/types/property';
import { propertyData } from '@/data/properties';
import PropertyModal from '@/components/PropertyModal';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';

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
  };

  return (
    <section id="properties" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-3xl font-bold text-brand-dark">Proprietăți Disponibile</h2>
            
            <div className="w-full md:w-auto flex flex-wrap gap-4">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Caută proprietăți..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-property-gold focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              
              <PropertyFilters
                filters={filters}
                onFilterChange={setFilters}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
                onResetFilters={resetFilters}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-brand-dark mb-2">
              Nu am găsit proprietăți care să corespundă criteriilor tale
            </h3>
            <p className="text-brand-gray-medium mb-4">
              Încearcă să ajustezi filtrele sau să ștergi termenul de căutare
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-property-gold text-white rounded-md hover:bg-property-stone transition-colors"
            >
              Resetează filtrele
            </button>
          </div>
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