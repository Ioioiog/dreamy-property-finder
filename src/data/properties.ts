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
    { label: 'Belvedere Residences', value: 'belvedere-residences' },
    { label: 'Calea Floreasca', value: 'calea-floreasca' },
  ],
  priceRange: [
    { label: 'Toate', value: 'all' },
    { label: '1000-1300€', value: '1000-1300' },
    { label: '1301-1600€', value: '1301-1600' },
    { label: '1601+€', value: '1601-9999' },
  ],
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
      constructionYear: 2024, 
      balcony: 37.1
    },
    location: {
      address: 'Complex Yacht Kid, Corp A',
      complex: 'yacht-kid',
      coordinates: [44.426912264449236, 26.11123675633533] as [number, number]
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg'],
    amenities: ['Balcon generos', 'Vedere panoramică', 'Primul chiriaş', 'Apartament in complex nou 2024'],
    panoramicUrl: 'https://momento360.com/e/u/9303891d183c47db90e91352a9b2969d'
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
      constructionYear: 2024,
      balcony: 12.6
    },
    location: {
      address: 'Complex Yacht Kid, Corp B',
      complex: 'yacht-kid',
      coordinates: [44.42841495259169, 26.105463339845763] as [number, number]
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'],
    amenities: ['Balcon generos', 'Vedere panoramică', 'Primul chiriaş', 'Apartament in complex nou 2024'],
    panoramicUrl: 'https://momento360.com/e/u/1a09f969a4c3447eb33547c57ee10b53'
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
      constructionYear: 2024,
      balcony: 12.7
    },
    location: {
      address: 'Complex Yacht Kid, Corp B',
      complex: 'yacht-kid',
      coordinates: [44.427336515998576, 26.106689630289278] as [number, number]
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'],
    amenities: ['Balcon generos', 'Vedere panoramică', 'Primul chiriaş', 'Apartament in complex nou 2024'],
    panoramicUrl: 'https://momento360.com/e/u/2c09f969a4c3447eb33547c57ee10b54'
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
      constructionYear: 2024,
      balcony: 12.3
    },
    location: {
      address: 'Complex Yacht Kid, Corp B',
      complex: 'yacht-kid',
      coordinates: [44.42929604108499, 26.108057494961265] as [number, number]
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'],
    amenities: ['Balcon generos', 'Vedere panoramică', 'Primul chiriaş', 'Apartament in complex nou 2024'],
    panoramicUrl: 'https://momento360.com/e/u/3d09f969a4c3447eb33547c57ee10b55'
  },
  {
    id: 'p26',
    title: 'Apartament Prima 26 - Prima Vista',
    price: "-----",
    description: 'Apartament luxos în complexul Prima Vista, cu 3 camere și balcoane impresionante totalizând 58.2 mp. Oferă o vedere panoramică și spații generoase de locuit.',
    status: propertyStatuses.RENTED,
    details: {
      rooms: 3,
      area: 68,
      totalArea: 126.2,
      floor: '5',
      building: '4B',
      constructionYear: 2024,
      balcony: 58.2
    },
    location: {
      address: 'Complex Prima Vista, Corp 4B',
      complex: 'prima-vista',
      coordinates: [44.42763169599856, 26.105758692854238] as [number, number]
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg'],
    amenities: ['Balcoane multiple', 'Vedere panoramică', 'Apartament in complex nou 2024'],
    panoramicUrl: 'https://momento360.com/e/u/4e09f969a4c3447eb33547c57ee10b56'
  },
  {
    id: 'p21',
    title: 'Apartament Prima 21 - Prima Vista',
    price: "-----",
    description: 'Apartament elegant în Prima Vista, cu 3 camere și multiple balcoane (46.9 mp în total). Perfect pentru cei care doresc spațiu extra și posibilități de relaxare în aer liber.',
    status: propertyStatuses.RENTED,
    availableFrom: '01.01.2027',
    details: {
      rooms: 3,
      area: 68.5,
      totalArea: 115.4,
      floor: '4',
      building: '4B',
      constructionYear: 2024,
      balcony: 46.9
    },
    location: {
      address: 'Complex Prima Vista, Corp 4B',
      complex: 'prima-vista',
      coordinates: [44.43555871126546, 26.103366204191687] as [number, number]
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'],
    amenities: ['Balcoane de 47 mp', 'Vedere panoramică spre lac', 'Apartament in complex nou 2024'],
    panoramicUrl: 'https://momento360.com/e/u/5f09f969a4c3447eb33547c57ee10b57'
  },
  {
    id: 'p51',
    title: 'Penthouse Prima 51 - Prima Vista',
    price: "-----",
    description: 'Penthouse spectaculos pe două niveluri în Prima Vista. Cu 4 camere și o suprafață generoasă, oferă un living impresionant și dormitoare spațioase. Ideal pentru cei care caută lux și exclusivitate.',
    status: propertyStatuses.RENTED,
    availableFrom: '01.01.2027',
    details: {
      rooms: 4,
      area: 149.9,
      totalArea: 149.9,
      floor: '10',
      building: '4B',
      constructionYear: 2024,
      balcony: 70
    },
    location: {
      address: 'Complex Prima Vista, Corp 4B',
      complex: 'prima-vista',
      coordinates: [44.42838350522629, 26.103564375902668] as [number, number]
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
    amenities: ['Penthouse', 'Vedere panoramică', 'Terasă', 'Vedere panoramică spre lac', 'Apartament in complex nou 2024'],
    panoramicUrl: 'https://momento360.com/e/u/6g09f969a4c3447eb33547c57ee10b58'
  },
  {
    id: 'ap 113',
    title: 'Duplex 3 Camere Ap 113B - Belvedere Residences',
    price: 2100,
    description: 'Apartament spațios cu design modern, ideal pentru familii. Include camere generoase și balcoane panoramice.',
    status: propertyStatuses.AVAILABLE,
    details: {
      rooms: 3,
      area: 113.2, // Suprafața utilă
      totalArea: 121.2, // Suprafața totală
      floor: 'Duplex',
      building: 'b5',
      constructionYear: 2023,
      balcony: 8// Sum of balconies
    },
    location: {
      address: 'Belvedere Residences, Bloc 5B',
      complex: 'belvedere-residences',
      coordinates: [44.000000, 26.000000] as [number, number] // Replace with actual coordinates if available
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg'],
    amenities: ['Balcon panoramic', 'Vedere spectaculoasă', 'Duplex modern', 'Compartimentare eficientă', 'Apartament in complex nou 2023'],
    panoramicUrl: 'https://momento360.com/e/u/6g09f969a4c3447eb33547c57ee10b62'
  },
  {
    id: 'ap 53',
    title: 'Duplex 3 Camere AP 53 - Belvedere Residences',
    price: 1450,
    description: 'Apartament duplex spațios cu 3 camere, perfect pentru familii. Include camere luminoase, terasă generoasă și compartimentare eficientă.',
    status: propertyStatuses.reserved,
    availableFrom: '01.03.2025',
    details: {
      rooms: 3,
      area: 110, // Suprafața utilă (replace with accurate data from document if needed)
      totalArea: 120, // Suprafața totală construită (replace with accurate data from document if needed)
      floor: 'Duplex',
      building: 'B11',
      constructionYear: 2021,
      balcony: 15 // Suprafața terasă (replace with accurate data from document if needed)
    },
    location: {
      address: 'Belvedere Residences, Bloc B11',
      complex: 'belvedere-residences',
      coordinates: [44.000000, 26.000000] as [number, number] // Replace with actual coordinates if available
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'],
    amenities: ['Terasă spațioasă', 'Apartament duplex', 'Compartimentare eficientă', 'Camere luminoase', 'Apartament in complex nou 2021'],
    panoramicUrl: 'https://momento360.com/e/u/6g09f969a4c3447eb33547c57ee10b59'
  },
  {
    id: 'ap 60',
    title: 'Duplex 3 Camere AP 60 - Belvedere Residences',
    price: "-----",
    description: 'Apartament pe două niveluri, cu design modern și spații generoase. Dispune de camere bine compartimentate și balcon spațios.',
    status: propertyStatuses.RENTED,
    availableFrom: '---------',
    details: {
      rooms: 3,
      area: 82.7, // Suprafața utilă
      totalArea: 95.9, // Suprafața totală
      floor: '10', // Indicating it's a duplex
      building: 'B7',
      constructionYear: 2023,
      balcony: 13.1 // Sum of the balconies
    },
    location: {
      address: 'Belvedere Residences, Bloc B7',
      complex: 'belvedere-residences',
      coordinates: [44.000000, 26.000000] as [number, number] // Replace with actual coordinates if available
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'],
    amenities: ['Balcon generos', 'Compartimentare eficientă', 'Design modern', 'Apartament duplex', 'Apartament in complex nou 2022'],
    panoramicUrl: 'https://momento360.com/e/u/6g09f969a4c3447eb33547c57ee10b60'
  },
  {
    id: 'ap 55',
    title: 'Duplex 3 Camere Ap 55 - Belvedere Residences',
    price: "---",
    description: 'Apartament duplex cu trei camere, potrivit pentru familii. Oferă spații bine organizate și un balcon impresionant.',
    status: propertyStatuses.RENTED,
    availableFrom: '---------',
    details: {
      rooms: 3,
      area: 85, // Adjust based on visible area details
      totalArea: 100, // Adjust based on total area details
      floor: '10/11',
      building: 'B8',
      constructionYear: 2023,
      balcony: 15 // Replace with actual total balcony area if different
    },
    location: {
      address: 'Belvedere Residences, Bloc 8B',
      complex: 'belvedere-residences',
      coordinates: [44.000000, 26.000000] as [number, number] // Replace with actual coordinates if available
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'],
    amenities: ['Balcon mare', 'Duplex modern', 'Vedere panoramică', 'Compartimentare funcțională', 'Apartament in complex nou 2022'],
    panoramicUrl: 'https://momento360.com/e/u/6g09f969a4c3447eb33547c57ee10b61'
  },
  {
    id: 'ap 109',
    title: 'Duplex 4 Camere AP 109 - Belvedere Residences,',
    price: "---",
    description: 'Apartament duplex cu 3 camere și balcoane generoase. Perfect pentru cei care caută confort și spațiu.',
    status: propertyStatuses.RENTED,
    availableFrom: '---------',
    details: {
      rooms: 3,
      area: 119.6, // Suprafața utilă
      totalArea: 143.5, // Suprafața totală
      floor: '10/11',
      building: 'Belvedere Residences',
      constructionYear: 2023,
      balcony: 7.8 + 8.3 + 7.8 // Total balcony areas
    },
    location: {
      address: 'Belvedere Residences,, Bloc 6',
      complex: 'belvedere-residences,',
      coordinates: [44.000000, 26.000000] as [number, number] // Replace with actual coordinates if available
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg'],
    amenities: ['Balcon panoramic', 'Compartimentare modernă', 'Design luxos', 'Penthouse', 'Apartament in complex nou 2023'],
    panoramicUrl: 'https://momento360.com/e/u/6g09f969a4c3447eb33547c57ee10b63'
  },
  {
    id: 'glinka 1',
    title: '2 Camere Calea Floreasca - Dorobanti',
    price: "---",
    description: 'Apartament modern 2 camere, situat pe Calea Floreasca, ideal pentru un stil de viață urban. Oferă un living spațios și un dormitor confortabil.',
    status: propertyStatuses.RENTED,
    availableFrom: '---------',
    details: {
      rooms: 2,
      area: 50, // Suprafața utilă apartament
      totalArea: 64, // Suprafața totală construită
      floor: '2',
      building: 'A',
      constructionYear: 1980,
    },
    location: {
      address: 'Calea Floreasca',
      complex: 'calea-floreasca',
      coordinates: [44.000000, 26.000000] as [number, number] // Replace with actual coordinates if available
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'],
    amenities: [ 'In inima orasului', 'Modern si urban', 'Apartament luminos'],
    panoramicUrl: 'https://momento360.com/e/u/6g09f969a4c3447eb33547c57ee10b64'
  },
  { id: 'ap 108',
    title: 'Duplex 2 Camere 108- Belvedere Residences',
    price: "---",
    description: 'Duplex modern cu 2 camere, situat în Belvedere Residences. Ideal pentru un stil de viață contemporan, cu terasă generoasă și compartimentare eficientă.',
    status: propertyStatuses.RENTED,
    availableFrom: '---------',
    details: {
      rooms: 2,
      area: 62.4, // Suprafața utilă apartament
      totalArea: 85.5, // Suprafața totală construită
      floor: '10',
      building: 'B6',
      constructionYear: 2023,
      balcony: 10.5 // Suprafața terasă
    },
    location: {
      address: 'Belvedere Residences, Bloc B6',
      complex: 'belvedere-residences',
      coordinates: [44.000000, 26.000000] as [number, number] // Replace with actual coordinates if available
    },
    mainImage: '1.jpg',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg'],
    amenities: ['Terasă spațioasă', 'Living pe douǎ etaje', 'Duplex modern', 'Apartament in complex nou 2023'],
    panoramicUrl: 'https://momento360.com/e/u/6g09f969a4c3447eb33547c57ee10b65'
  }
];
