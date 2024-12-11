export interface PropertyDetails {
  rooms: number;
  area: number;
}

export interface PropertyLocation {
  complex: string;
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
}

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