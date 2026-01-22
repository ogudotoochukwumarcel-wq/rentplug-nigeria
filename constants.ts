
import { ListingCategory, UserRole, ListingStatus, Listing, User } from './types';

export const CITIES = {
  Enugu: ['Trans Ekulu', 'GRA', 'New Haven', 'Thinkers Corner', 'Independence Layout', 'Coal Camp', 'Achara Layout'],
  Owerri: ['Ikenegbu', 'World Bank', 'Aladinma', 'New Owerri', 'Amakohia', 'Akwakuma', 'Federal Housing']
};

export const CATEGORIES = Object.values(ListingCategory);

export const ADMIN_NUMBERS = [
  '+2348166104441',
  '+2348104106235',
  '08166104441',
  '08104106235',
  '2348166104441',
  '2348104106235'
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Chinedu Okoro',
    phone: '08012345678',
    email: 'chinedu@rentplug.com',
    role: UserRole.AGENT,
    city: 'Enugu',
    isVerified: true,
    isBlocked: false,
    createdAt: new Date('2023-01-01'),
    profilePhoto: 'https://picsum.photos/seed/user1/200'
  },
  {
    id: 'u2',
    name: 'Marcel (Admin)',
    phone: '+2348166104441',
    email: 'admin@rentplug.ng',
    role: UserRole.ADMIN,
    city: 'Owerri',
    isVerified: true,
    isBlocked: false,
    createdAt: new Date('2023-01-01'),
    profilePhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcel'
  }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'Modern 2 Bedroom Flat in New Haven',
    description: 'Beautifully finished 2 bedroom flat with all rooms ensuite. Constant water supply and secured environment.',
    price: 850000,
    paymentPeriod: 'year',
    state: 'Enugu',
    city: 'Enugu',
    area: 'New Haven',
    category: ListingCategory.TWO_BR,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['Water', 'Light', 'Security', 'Tiles/Flooring'],
    images: ['https://picsum.photos/seed/apt1/800/600', 'https://picsum.photos/seed/apt2/800/600'],
    ownerId: 'u1',
    ownerName: 'Chinedu Okoro',
    ownerPhone: '08012345678',
    status: ListingStatus.APPROVED,
    isFeatured: true,
    isVerified: true,
    houseRules: 'No pets allowed. No loud parties.',
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 125
  },
  {
    id: 'l2',
    title: 'Self Contain at Ikenegbu Layout',
    description: 'Tiled self contain with wardrobe and kitchen cabinet. Close to the main road.',
    price: 250000,
    paymentPeriod: 'year',
    state: 'Imo',
    city: 'Owerri',
    area: 'Ikenegbu',
    category: ListingCategory.SELF_CONTAIN,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Water', 'Light', 'Security', 'Fence/Gate'],
    images: ['https://picsum.photos/seed/apt3/800/600'],
    ownerId: 'u1',
    ownerName: 'Chinedu Okoro',
    ownerPhone: '08012345678',
    status: ListingStatus.APPROVED,
    isFeatured: false,
    isVerified: true,
    houseRules: 'Payment covers light and security.',
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 45
  },
  {
    id: 'l3',
    title: 'Luxury 3 Bedroom Duplex in GRA',
    description: 'Executive 3 bedroom duplex with penthouse. Located in the heart of GRA Enugu.',
    price: 2500000,
    paymentPeriod: 'year',
    state: 'Enugu',
    city: 'Enugu',
    area: 'GRA',
    category: ListingCategory.DUPLEX,
    bedrooms: 3,
    bathrooms: 4,
    amenities: ['Water', 'Light', 'Security', 'Parking', 'Generator', 'Fence/Gate'],
    images: ['https://picsum.photos/seed/house1/800/600', 'https://picsum.photos/seed/house2/800/600'],
    ownerId: 'u1',
    ownerName: 'Chinedu Okoro',
    ownerPhone: '08012345678',
    status: ListingStatus.APPROVED,
    isFeatured: true,
    isVerified: true,
    houseRules: 'Family tenants only.',
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 340
  },
  {
    id: 'l4',
    title: 'Pending Studio near FUTO',
    description: 'Freshly built studio apartment for students. Reliable power and close to school gate.',
    price: 180000,
    paymentPeriod: 'year',
    state: 'Imo',
    city: 'Owerri',
    area: 'World Bank',
    category: ListingCategory.SELF_CONTAIN,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Water', 'Light', 'Fence/Gate'],
    images: ['https://picsum.photos/seed/futo/800/600'],
    ownerId: 'u1',
    ownerName: 'Chinedu Okoro',
    ownerPhone: '08012345678',
    status: ListingStatus.PENDING,
    isFeatured: false,
    isVerified: false,
    houseRules: 'Students only.',
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 12
  }
];
