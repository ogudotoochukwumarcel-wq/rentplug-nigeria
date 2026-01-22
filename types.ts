
export enum UserRole {
  RENTER = 'RENTER',
  AGENT = 'AGENT',
  LANDLORD = 'LANDLORD',
  ADMIN = 'ADMIN'
}

export enum ListingCategory {
  SELF_CONTAIN = 'Self contain',
  ONE_BR = '1BR',
  TWO_BR = '2BR',
  THREE_BR = '3BR',
  DUPLEX = 'Duplex',
  SHOP = 'Shop',
  OFFICE = 'Office',
  LAND = 'Land',
  SHORTLET = 'Shortlet'
}

export enum ListingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED'
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  city: string;
  profilePhoto?: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  paymentPeriod: 'month' | 'year';
  state: 'Enugu' | 'Imo';
  city: 'Enugu' | 'Owerri';
  area: string;
  category: ListingCategory;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  videoUrl?: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  status: ListingStatus;
  isFeatured: boolean;
  isVerified: boolean;
  houseRules: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
}

export interface InspectionRequest {
  id: string;
  listingId: string;
  renterId: string;
  renterName: string;
  date: string;
  time: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INSPECTION' | 'LISTING_APPROVAL' | 'GENERAL';
  isRead: boolean;
  createdAt: Date;
}
