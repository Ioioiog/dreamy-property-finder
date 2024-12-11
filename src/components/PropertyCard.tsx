import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, Square } from 'lucide-react';

interface PropertyCardProps {
  image: string;
  title: string;
  price: string;
  beds: number;
  baths: number;
  sqm: number;
  location: string;
}

export const PropertyCard = ({ image, title, price, beds, baths, sqm, location }: PropertyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-property-cream px-3 py-1 text-xs font-medium text-property-stone">
            Featured
          </span>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-property-stone">{title}</h3>
        <p className="mb-4 text-sm text-property-muted">{location}</p>
        <div className="mb-4 flex items-center gap-4 text-sm text-property-muted">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{beds} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{baths} baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{sqm} m²</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-property-gold">{price}</span>
          <button className="rounded-lg bg-property-cream px-4 py-2 text-sm font-medium text-property-stone transition-colors hover:bg-property-gold hover:text-white">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};