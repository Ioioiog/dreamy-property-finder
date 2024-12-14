import { Property, propertyStatuses } from '@/types/property';
import { Eye, Info, View, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
  onViewGallery: (property: Property) => void;
  onViewDetails: (property: Property) => void;
}

export default function PropertyCard({ 
  property, 
  onViewGallery, 
  onViewDetails,
}: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  // Use unsplash fallback if image fails to load
  const fallbackImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  
  // Try to load from public/assets first
  const mainImagePath = `/assets/images/properties/${property.id}/${property.images[0]}`;

  console.log('Loading image for property:', property.id);
  console.log('Image path:', mainImagePath);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all"
      role="article"
      aria-label={`${property.title} - ${property.price}€`}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageError ? fallbackImage : mainImagePath}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            console.error('Failed to load image:', mainImagePath);
            setImageError(true);
          }}
          onLoad={() => console.log('Image loaded successfully:', mainImagePath)}
        />
        {property.status === propertyStatuses.AVAILABLE ? (
          <div className="absolute top-4 right-4">
            <Badge className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              DISPONIBIL
            </Badge>
          </div>
        ) : (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium 
            bg-black/70 text-white backdrop-blur-sm">
            {property.status === propertyStatuses.RENTED ? 'Închiriat' : 'Rezervat'}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 right-4 flex gap-2">
            {property.panoramicUrl && (
              <motion.button
                onClick={() => navigate(`/panoramic/${property.id}`)}
                className="bg-white/90 text-property-stone px-4 py-2 rounded-md 
                  hover:bg-property-orange hover:text-white transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Vezi panorama"
              >
                <View size={18} />
                Panoramă
              </motion.button>
            )}
            <motion.button
              onClick={() => onViewGallery(property)}
              className="bg-white/90 text-property-stone px-4 py-2 rounded-md 
                hover:bg-property-orange hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Vezi galeria foto"
            >
              <Eye size={18} />
              Galerie foto ({property.images.length})
            </motion.button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-property-stone mb-2">{property.title}</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="text-property-muted">
            {property.details.rooms} camere • {property.details.area} mp
          </div>
          <div className="text-2xl font-bold text-property-orange">
            {property.price}€
          </div>
        </div>

        <p className="text-property-muted mb-4 line-clamp-2">
          {property.description}
        </p>

        <motion.button
          onClick={() => onViewDetails(property)}
          className="w-full px-4 py-2 bg-property-orange text-white rounded-md 
            hover:bg-property-orange-dark transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Vezi detalii complete"
        >
          <Info size={18} />
          Vezi detalii
        </motion.button>

        {property.status !== propertyStatuses.AVAILABLE && (
          <div className="text-center text-property-muted text-sm mt-2">
            Disponibil din: {property.availableFrom}
          </div>
        )}
      </div>
    </motion.div>
  );
}