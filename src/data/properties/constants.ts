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