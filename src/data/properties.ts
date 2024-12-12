import { Property } from '@/types/property';

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
    { label: 'Yacht Kid', value: 'yacht-kid' },
    { label: 'Prima Vista', value: 'prima-vista' },
  ],
  priceRange: [
    { label: 'Toate', value: 'all' },
    { label: '1000-1300€', value: '1000-1300' },
    { label: '1301-1600€', value: '1301-1600' },
    { label: '1601+€', value: '1601-9999' },
  ],
};

// Helper function to generate image array
const generatePropertyImages = (propertyId: string): string[] => {
  return Array.from({ length: 15 }, (_, i) => `${i + 1}.jpg`);
};

export const propertyData: Property[] = [
  {
    id: 'a25',
    title: 'Apartament A.2.5 - Yacht Kid',
    price: 1500,
    description: 'Apartament spațios în complexul Yacht Kid, cu 3 camere și balcon generos de 37.1 mp. Ideal pentru familii, oferind un living confortabil și două dormitoare.',
    status: propertyStatuses.AVAILABLE,
    details: {
      rooms: 3,
      area: 71.4,
      totalArea: 108.5,
      floor: '2',
      building: 'A',
      balcony: 37.1
    },
    location: {
      address: 'Complex Yacht Kid, Corp A',
      complex: 'yacht-kid',
      coordinates: [44.426912264449236, 26.11123675633533] as [number, number]
    },
    mainImage: '1.jpg',
    images: generatePropertyImages('a25'),
    amenities: ['Balcon generos', 'Vedere panoramică', 'Parcare'],
    panoramicUrl: '/assets/images/properties/a25/panoramic.jpg'
  },
  {
    id: 'b110',
    title: 'Apartament B.1.10 - Yacht Kid',
    price: 1200,
    description: 'Apartament modern în Yacht Kid, perfect pentru cupluri sau persoane singure. Dispune de un living mare și un dormitor confortabil, cu balcon de 12.6 mp.',
    status: propertyStatuses.AVAILABLE,
    details: {
      rooms: 2,
      area: 52.4,
      totalArea: 65,
      floor: '1',
      building: 'B',
      balcony: 12.6
    },
    location: {
      address: 'Complex Yacht Kid, Corp B',
      complex: 'yacht-kid',
      coordinates: [44.42841495259169, 26.105463339845763] as [number, number]
    },
    mainImage: '1.jpg',
    images: generatePropertyImages('b110'),
    amenities: ['Balcon', 'Parcare', 'Depozitare'],
    panoramicUrl: '/assets/images/properties/b110/panoramic.jpg'
  },
  {
    id: 'b27',
    title: 'Apartament B.2.7 - Yacht Kid',
    price: 1200,
    description: 'Apartament eficient în Yacht Kid, cu două camere și balcon. Oferă un spațiu de living generos și un dormitor confortabil, ideal pentru un stil de viață urban.',
    status: propertyStatuses.AVAILABLE,
    details: {
      rooms: 2,
      area: 51.1,
      totalArea: 63.8,
      floor: '2',
      building: 'B',
      balcony: 12.7
    },
    location: {
      address: 'Complex Yacht Kid, Corp B',
      complex: 'yacht-kid',
      coordinates: [44.427336515998576, 26.106689630289278] as [number, number]
    },
    images: generatePropertyImages('b27'),
    amenities: ['Balcon', 'Parcare', 'Depozitare'],
    panoramicUrl: '/assets/images/properties/b27/panoramic.jpg'
  },
  {
    id: 'b29',
    title: 'Apartament B.2.9 - Yacht Kid',
    price: 1200,
    description: 'Apartament bine compartimentat în Yacht Kid, cu două camere și balcon. Dispune de un living și un dormitor spațioase, perfect pentru cei care apreciază confortul.',
    status: propertyStatuses.AVAILABLE,
    details: {
      rooms: 2,
      area: 52.2,
      totalArea: 64.5,
      floor: '2',
      building: 'B',
      balcony: 12.3
    },
    location: {
      address: 'Complex Yacht Kid, Corp B',
      complex: 'yacht-kid',
      coordinates: [44.42929604108499, 26.108057494961265] as [number, number]
    },
    images: generatePropertyImages('b29'),
    amenities: ['Balcon', 'Parcare', 'Depozitare'],
    panoramicUrl: '/assets/images/properties/b29/panoramic.jpg'
  },
  {
    id: 'p26',
    title: 'Apartament Prima 26 - Prima Vista',
    price: 1200,
    description: 'Apartament luxos în complexul Prima Vista, cu 3 camere și balcoane impresionante totalizând 58.2 mp. Oferă o vedere panoramică și spații generoase de locuit.',
    status: propertyStatuses.AVAILABLE,
    details: {
      rooms: 3,
      area: 68,
      totalArea: 126.2,
      floor: '5',
      building: '4B',
      balcony: 58.2
    },
    location: {
      address: 'Complex Prima Vista, Corp 4B',
      complex: 'prima-vista',
      coordinates: [44.42763169599856, 26.105758692854238] as [number, number]
    },
    images: generatePropertyImages('p26'),
    amenities: ['Balcoane multiple', 'Vedere panoramică', 'Parcare'],
    panoramicUrl: '/assets/images/properties/p26/panoramic.jpg'
  },
  {
    id: 'p21',
    title: 'Apartament Prima 21 - Prima Vista',
    price: 1200,
    description: 'Apartament elegant în Prima Vista, cu 3 camere și multiple balcoane (46.9 mp în total). Perfect pentru cei care doresc spațiu extra și posibilități de relaxare în aer liber.',
    status: propertyStatuses.RENTED,
    availableFrom: '01.01.2027',
    details: {
      rooms: 3,
      area: 68.5,
      totalArea: 115.4,
      floor: '4',
      building: '4B',
      balcony: 46.9
    },
    location: {
      address: 'Complex Prima Vista, Corp 4B',
      complex: 'prima-vista',
      coordinates: [44.43555871126546, 26.103366204191687] as [number, number]
    },
    images: generatePropertyImages('p21'),
    amenities: ['Balcoane multiple', 'Vedere panoramică', 'Parcare'],
    panoramicUrl: '/assets/images/properties/p21/panoramic.jpg'
  },
  {
    id: 'p51',
    title: 'Penthouse Prima 51 - Prima Vista',
    price: 1800,
    description: 'Penthouse spectaculos pe două niveluri în Prima Vista. Cu 4 camere și o suprafață generoasă, oferă un living impresionant și dormitoare spațioase. Ideal pentru cei care caută lux și exclusivitate.',
    status: propertyStatuses.RENTED,
    availableFrom: '01.01.2027',
    details: {
      rooms: 4,
      area: 149.9,
      totalArea: 149.9,
      floor: '10',
      building: '4B',
      balcony: 70
    },
    location: {
      address: 'Complex Prima Vista, Corp 4B',
      complex: 'prima-vista',
      coordinates: [44.42838350522629, 26.103564375902668] as [number, number]
    },
    images: generatePropertyImages('p51'),
    amenities: ['Penthouse', 'Vedere panoramică', 'Terasă', 'Parcare'],
    panoramicUrl: '/assets/images/properties/p51/panoramic.jpg'
  }
];
