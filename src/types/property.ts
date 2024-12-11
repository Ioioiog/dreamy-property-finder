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
  coordinates: [number, number]; // Added coordinates as tuple of numbers
}

export interface Property {
  id: string; // Changed from number to string
  title: string;
  price: number;
  description: string;
  status: string;
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