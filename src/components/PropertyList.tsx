import { useState, useMemo, useEffect } from 'react';
import { Property, Filters } from '@/types/property';
import { propertyData } from '@/data/properties';
import PropertyModal from '@/components/PropertyModal';
import { toast } from '@/components/ui/use-toast';
import SearchAndFilter from './PropertyList/SearchAndFilter';
import PropertyFilters from './PropertyFilters';
import PropertyGrid from './PropertyList/PropertyGrid';
import NoResults from './PropertyList/NoResults';
import LoadingSkeleton from './PropertyList/LoadingSkeleton';

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
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {showFilters && (
          <PropertyFilters
            filters={filters}
            onFilterChange={setFilters}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            onResetFilters={resetFilters}
          />
        )}

        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredProperties.length > 0 ? (
          <PropertyGrid
            properties={filteredProperties}
            onViewGallery={onPropertySelect}
            onViewDetails={(property) => {
              setSelectedProperty(property);
              setShowModal(true);
            }}
          />
        ) : (
          <NoResults onResetFilters={resetFilters} />
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