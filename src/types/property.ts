export type Property = {
  id: string;
  title: string;
  price: number;
  description: string;
  status: PropertyStatus;
  details: {
    rooms: number;
    area: number;
    totalArea: number;
    floor: string;
    building: string;
    balcony?: number;
  };
  location: {
    address: string;
    complex: string;
    coordinates: [number, number];
  };
  mainImage?: string;
  images: string[];
  amenities: string[];
  panoramicUrl?: string;
  availableFrom?: string;
};

export type PropertyStatus = 'available' | 'rented' | 'reserved';

export const propertyStatuses = {
  AVAILABLE: 'available' as const,
  RENTED: 'rented' as const,
  RESERVED: 'reserved' as const,
};

export type Filters = {
  status: string;
  rooms: string;
  complex: string;
  priceRange: string;
};