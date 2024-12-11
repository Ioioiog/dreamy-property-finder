export const propertyStatuses = {
  AVAILABLE: 'available',
  RENTED: 'rented',
  RESERVED: 'reserved',
} as const;

export const filterOptions = {
  status: [
    { label: 'Toate', value: 'all' },
    { label: 'Disponibile', value: 'available' },
    { label: 'Închiriate', value: 'rented' },
    { label: 'Rezervate', value: 'reserved' },
  ],
  rooms: [
    { label: 'Toate', value: 'all' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4+', value: '4' },
  ],
  complex: [
    { label: 'Toate', value: 'all' },
    { label: 'Complex A', value: 'complex-a' },
    { label: 'Complex B', value: 'complex-b' },
  ],
  priceRange: [
    { label: 'Toate', value: 'all' },
    { label: '0-100000', value: '0-100000' },
    { label: '100001-200000', value: '100001-200000' },
    { label: '200001+', value: '200001' },
  ],
};

export const propertyData = [
  {
    id: 1,
    title: "Apartament Modern în Complex A",
    description: "Apartament spațios cu 2 camere și vedere panoramică",
    status: propertyStatuses.AVAILABLE,
    price: 150000,
    details: {
      rooms: 2,
      area: 65,
      floor: 3,
      building: "A",
      totalArea: 72,
      balcony: 7
    },
    location: {
      complex: "complex-a",
      address: "Strada Exemplu, nr. 1, Complex A"
    },
    images: ["1.jpg", "2.jpg", "3.jpg"],
    amenities: ["Parcare", "Aer condiționat", "Centrală proprie", "Mobilat complet"],
    availableFrom: "2024-03-01"
  }
];