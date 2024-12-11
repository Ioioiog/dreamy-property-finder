import { SlidersHorizontal } from 'lucide-react';
import { Filters } from '@/types/property';
import { filterOptions } from '@/data/properties';
import FilterSection from './PropertyList/FilterSection';
import FiltersHeader from './PropertyList/FiltersHeader';

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
          <FiltersHeader onResetFilters={onResetFilters} />

          <div className="space-y-4">
            <FilterSection
              title="Status"
              options={filterOptions.status}
              currentValue={filters.status}
              onChange={(value) => onFilterChange({ ...filters, status: value })}
            />

            <FilterSection
              title="Număr camere"
              options={filterOptions.rooms}
              currentValue={filters.rooms}
              onChange={(value) => onFilterChange({ ...filters, rooms: value })}
            />

            <FilterSection
              title="Complex"
              options={filterOptions.complex}
              currentValue={filters.complex}
              onChange={(value) => onFilterChange({ ...filters, complex: value })}
            />

            <FilterSection
              title="Preț"
              options={filterOptions.priceRange}
              currentValue={filters.priceRange}
              onChange={(value) => onFilterChange({ ...filters, priceRange: value })}
            />
          </div>
        </div>
      )}
    </>
  );
}