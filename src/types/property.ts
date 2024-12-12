export interface PropertyDetails {
  rooms: number;
  area: number;
  totalArea: number;
  floor: string;
  building: string;
  balcony?: number;
}

export interface PropertyLocation {
  complex: string;
  address: string;
  coordinates: [number, number];
}

export interface Property {
  id: string;
  title: string;
  price: number;
  description: string;
  status: string;
  details: PropertyDetails;
  location: PropertyLocation;
  availableFrom?: string;
  images: string[];
  amenities: string[];
  panoramicUrl?: string;
}

export const propertyStatuses = {
  AVAILABLE: 'available',
  RENTED: 'rented',
  RESERVED: 'reserved',
} as const;

export interface FilterButtonProps {
  label: string;
  value: string;
  currentValue: string;
  onChange: (value: string) => void;
}

export interface Filters {
  status: string;
  rooms: string;
  complex: string;
  priceRange: string;
}