export interface PropertyDetails {
  rooms: number;
  area: number;
  floor: number;
  building: string;
  totalArea: number;
  balcony?: number;
}

export interface PropertyLocation {
  complex: string;
  address: string;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  status: string;
  price: number;
  details: PropertyDetails;
  location: PropertyLocation;
  availableFrom?: string;
  images: string[];
  amenities: string[];
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