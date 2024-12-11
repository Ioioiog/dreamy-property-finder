import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import PropertyGallery from './PropertyGallery';
import PropertyModal from './PropertyModal';

interface Property {
  id: number;
  title: string;
  description: string;
  status: string;
  price: number;
  details: {
    rooms: number;
    area: number;
  };
  location: {
    complex: string;
  };
  availableFrom?: string;
  images: string[];
}

interface FilterButtonProps {
  label: string;
  value: string;
  currentValue: string;
  onChange: (value: string) => void;
}

interface Filters {
  status: string;
  rooms: string;
  complex: string;
  priceRange: string;
}

const filterOptions = {
  status: [
    { label: 'Toate', value: 'all' },
    { label: 'Disponibile', value: 'available' },
    { label: 'Închiriate', value: 'rented' },
    { label: 'Rezervate', value: 'reserved' },
  ],
  rooms: [
    { label: 'Toate', value: 'all' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4+', value: '4' },
  ],
  complex: [
    { label: 'Toate', value: 'all' },
    { label: 'Complex A', value: 'complex-a' },
    { label: 'Complex B', value: 'complex-b' },
  ],
  priceRange: [
    { label: 'Toate', value: 'all' },
    { label: '0-100000', value: '0-100000' },
    { label: '100001-200000', value: '100001-200000' },
    { label: '200001+', value: '200001' },
  ],
};

const propertyStatuses = {
  AVAILABLE: 'available',
  RENTED: 'rented',
  RESERVED: 'reserved',
};

export default function PropertyList() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showGallery, setShowGallery] = useState(false);
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

  const FilterButton: React.FC<FilterButtonProps> = ({ label, value, currentValue, onChange }) => (
    <button
      onClick={() => onChange(value)}
      className={`px-3 py-1 rounded-full text-sm transition-colors ${
        currentValue === value
          ? 'bg-property-gold text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

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
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <SlidersHorizontal size={20} />
                Filtre
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-lg animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-brand-dark">Filtrează proprietățile</h3>
                <button
                  onClick={() => {
                    setFilters({
                      status: 'all',
                      rooms: 'all',
                      complex: 'all',
                      priceRange: 'all'
                    });
                    setSearchTerm('');
                  }}
                  className="text-sm text-brand-orange hover:text-brand-orange-dark"
                >
                  Resetează filtrele
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.status.map(option => (
                      <FilterButton
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        currentValue={filters.status}
                        onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Număr camere</h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.rooms.map(option => (
                      <FilterButton
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        currentValue={filters.rooms}
                        onChange={(value) => setFilters(prev => ({ ...prev, rooms: value }))}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Complex</h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.complex.map(option => (
                      <FilterButton
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        currentValue={filters.complex}
                        onChange={(value) => setFilters(prev => ({ ...prev, complex: value }))}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Preț</h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.priceRange.map(option => (
                      <FilterButton
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        currentValue={filters.priceRange}
                        onChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`../assets/images/properties/${property.id}/1.jpg`}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {property.status !== propertyStatuses.AVAILABLE && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium 
                    bg-black/70 text-white backdrop-blur-sm">
                    {property.status === propertyStatuses.RENTED ? 'Închiriat' : 'Rezervat'}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setSelectedProperty(property);
                      setShowGallery(true);
                    }}
                    className="absolute bottom-4 right-4 bg-white/90 text-brand-dark px-4 py-2 rounded-md 
                      hover:bg-brand-orange hover:text-white transition-colors"
                  >
                    Vezi galerie foto
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-dark mb-2">{property.title}</h3>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-brand-gray-medium">
                    {property.details.rooms} camere • {property.details.area} mp
                  </div>
                  <div className="text-2xl font-bold text-brand-orange">
                    {property.price}€
                  </div>
                </div>

                <p className="text-brand-gray-medium mb-4 line-clamp-2">
                  {property.description}
                </p>

                {property.status === propertyStatuses.AVAILABLE ? (
                  <button
                    onClick={() => {
                      setSelectedProperty(property);
                      setShowModal(true);
                    }}
                    className="w-full px-4 py-2 bg-brand-orange text-white rounded-md 
                      hover:bg-brand-orange-dark transition-colors"
                  >
                    Vezi detalii
                  </button>
                ) : (
                  <div className="text-center text-brand-gray-medium text-sm">
                    Disponibil din: {property.availableFrom}
                  </div>
                )}
              </div>
            </div>
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
              onClick={() => {
                setFilters({
                  status: 'all',
                  rooms: 'all',
                  complex: 'all',
                  priceRange: 'all'
                });
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-brand-orange text-white rounded-md hover:bg-brand-orange-dark transition-colors"
              >
              Resetează filtrele
            </button>
          </div>
        )}

        {/* Property Gallery Modal */}
        {showGallery && selectedProperty && (
          <PropertyGallery
            isOpen={showGallery}
            onClose={() => setShowGallery(false)}
            property={selectedProperty}
          />
        )}

        {/* Property Details Modal */}
        {showModal && selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={() => setShowModal(false)}
            onOpenGallery={() => {
              setShowModal(false);
              setShowGallery(true);
            }}
          />
        )}
      </div>
    </section>
  );
}

// Adaugă StatusBadge component pentru a afișa statusul proprietății
const StatusBadge = ({ status }) => {
  const statusConfig = {
    [propertyStatuses.AVAILABLE]: {
      text: 'Disponibil',
      className: 'bg-green-100 text-green-800'
    },
    [propertyStatuses.RENTED]: {
      text: 'Închiriat',
      className: 'bg-red-100 text-red-800'
    },
    [propertyStatuses.RESERVED]: {
      text: 'Rezervat',
      className: 'bg-yellow-100 text-yellow-800'
    }
  };

  const config = statusConfig[status];
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.text}
    </span>
  );
};


// Adaugă ScheduleViewingButton component pentru a facilita programarea vizionării proprietății
const ScheduleViewingButton = () => {
  return (
    <button
      className="w-full px-4 py-2 bg-brand-orange text-white rounded-md hover:bg-brand-orange-dark transition-colors"
    >
      Programă vizionare
    </button>
  );
};
