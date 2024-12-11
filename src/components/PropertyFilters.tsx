import { SlidersHorizontal } from 'lucide-react';
import { Filters } from '@/types/property';
import { filterOptions } from '@/data/properties';
import PropertyFilterButton from '@/components/PropertyFilterButton';

interface PropertyFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onResetFilters: () => void;
}

export default function PropertyFilters({ 
  filters, 
  onFilterChange, 
  showFilters, 
  onToggleFilters,
  onResetFilters 
}: PropertyFiltersProps) {
  return (
    <>
      <button
        onClick={onToggleFilters}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <SlidersHorizontal size={20} />
        Filtre
      </button>

      {showFilters && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-brand-dark">Filtrează proprietățile</h3>
            <button
              onClick={onResetFilters}
              className="text-sm text-property-gold hover:text-property-stone"
            >
              Resetează filtrele
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.status.map(option => (
                  <PropertyFilterButton
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    currentValue={filters.status}
                    onChange={(value) => onFilterChange({ ...filters, status: value })}
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Număr camere</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.rooms.map(option => (
                  <PropertyFilterButton
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    currentValue={filters.rooms}
                    onChange={(value) => onFilterChange({ ...filters, rooms: value })}
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Complex</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.complex.map(option => (
                  <PropertyFilterButton
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    currentValue={filters.complex}
                    onChange={(value) => onFilterChange({ ...filters, complex: value })}
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preț</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.priceRange.map(option => (
                  <PropertyFilterButton
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    currentValue={filters.priceRange}
                    onChange={(value) => onFilterChange({ ...filters, priceRange: value })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}