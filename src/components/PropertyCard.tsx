import { Property, propertyStatuses } from '@/types/property';
import { Rotate3d, Eye, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

interface PropertyCardProps {
  property: Property;
  onViewGallery: (property: Property) => void;
  onViewDetails: (property: Property) => void;
  on360View?: (property: Property) => void;
}

export default function PropertyCard({ 
  property, 
  onViewGallery, 
  onViewDetails,
  on360View 
}: PropertyCardProps) {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      if (property.images[0]) {
        console.log('Attempting to load image for property:', property.id);
        console.log('Image path:', `${property.id}/${property.images[0]}`);
        
        const { data } = supabase.storage
          .from('property_images')
          .getPublicUrl(`${property.id}/${property.images[0]}`);
        
        console.log('Generated public URL:', data.publicUrl);
        setImageUrl(data.publicUrl);

        // Verify if the image exists by trying to load it
        const img = new Image();
        img.onload = () => console.log('Image loaded successfully:', data.publicUrl);
        img.onerror = () => console.error('Failed to load image:', data.publicUrl);
        img.src = data.publicUrl;
      }
    };
    loadImage();
  }, [property.id, property.images]);

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
          src={imageUrl || '/placeholder.svg'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {property.status !== propertyStatuses.AVAILABLE && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium 
            bg-black/70 text-white backdrop-blur-sm">
            {property.status === propertyStatuses.RENTED ? 'Închiriat' : 'Rezervat'}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 right-4 flex gap-2">
            {on360View && (
              <motion.button
                onClick={() => on360View(property)}
                className="bg-white/90 text-property-stone px-4 py-2 rounded-md 
                  hover:bg-property-orange hover:text-white transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Vezi apartamentul în 360°"
              >
                <Rotate3d size={18} />
                Vedere 360°
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
              Galerie foto
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

        {property.status === propertyStatuses.AVAILABLE ? (
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
        ) : (
          <div className="text-center text-property-muted text-sm">
            Disponibil din: {property.availableFrom}
          </div>
        )}
      </div>
    </motion.div>
  );
}