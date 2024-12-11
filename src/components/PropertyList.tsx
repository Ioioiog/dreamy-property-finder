import { useState } from 'react';
import { Property } from '@/types/property';
import { PropertiesGrid } from './PropertiesGrid';
import PropertyGallery from './PropertyGallery';

interface PropertyListProps {
  onPropertySelect: (property: Property) => void;
}

export default function PropertyList({ onPropertySelect }: PropertyListProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [viewMode, setViewMode] = useState<"gallery" | "360">("gallery");

  const handleView360 = (property: Property) => {
    setSelectedProperty(property);
    setViewMode("360");
  };

  const handleViewGallery = (property: Property) => {
    setSelectedProperty(property);
    setViewMode("gallery");
  };

  const handleCloseViewer = () => {
    setSelectedProperty(null);
  };

  return (
    <section id="properties" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Premium Properties
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our handpicked selection of luxury properties
          </p>
        </div>

        <PropertiesGrid
          onViewGallery={handleViewGallery}
          onView360={handleView360}
        />

        {selectedProperty && (
          <PropertyGallery
            isOpen={!!selectedProperty}
            onClose={handleCloseViewer}
            property={selectedProperty}
            mode={viewMode}
          />
        )}
      </div>
    </section>
  );
}