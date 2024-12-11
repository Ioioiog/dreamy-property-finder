import { motion } from 'framer-motion';
import { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  onViewGallery: (property: Property) => void;
  onViewDetails: (property: Property) => void;
}

export default function PropertyGrid({ properties, onViewGallery, onViewDetails }: PropertyGridProps) {
  return (
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
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onViewGallery={onViewGallery}
          onViewDetails={onViewDetails}
        />
      ))}
    </motion.div>
  );
}