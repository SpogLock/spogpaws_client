// API Configuration for Spog Paws Platform
import { IApiConfig } from '@/types';

export const createApiConfig = (): IApiConfig => {
  const config: IApiConfig = {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    retryAttempts: parseInt(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || '3'),
    retryDelay: parseInt(process.env.NEXT_PUBLIC_API_RETRY_DELAY || '1000'),
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
};

// Environment-specific configurations
export const getEnvironmentConfig = () => {
  const env = process.env.NODE_ENV;
  
  switch (env) {
    case 'development':
      return {
        ...createApiConfig(),
        timeout: 60000, // Longer timeout for development
      };
    
    case 'production':
      return {
        ...createApiConfig(),
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.spogpaws.com/v1',
        timeout: 30000,
      };
    
    case 'test':
      return {
        ...createApiConfig(),
        baseUrl: 'http://localhost:8080/api/v1',
        timeout: 10000,
        retryAttempts: 1,
      };
    
    default:
      return createApiConfig();
  }
};

// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CURRENT_USER: '/auth/me',
  },

  // Users
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    BY_EMAIL: (email: string) => `/users/email/${email}`,
    BY_ROLE: (role: string) => `/users/role/${role}`,
    PROFILE: (id: string) => `/users/${id}/profile`,
    UPLOAD_AVATAR: (id: string) => `/users/${id}/avatar`,
    VERIFY: (id: string) => `/users/${id}/verify`,
    DEACTIVATE: (id: string) => `/users/${id}/deactivate`,
  },

  // Vets
  VETS: {
    BASE: '/vets',
    BY_ID: (id: string) => `/vets/${id}`,
    BY_SPECIALIZATION: (specialization: string) => `/vets/specialization/${specialization}`,
    BY_LOCATION: '/vets/location',
    AVAILABLE: '/vets/available',
    SEARCH: '/vets/search',
    AVAILABILITY: (id: string) => `/vets/${id}/availability`,
    REVIEWS: (id: string) => `/vets/${id}/reviews`,
  },

  // Pets
  PETS: {
    BASE: '/pets',
    BY_ID: (id: string) => `/pets/${id}`,
    BY_OWNER: (ownerId: string) => `/pets/owner/${ownerId}`,
    BY_SPECIES: (species: string) => `/pets/species/${species}`,
    LOST: '/pets/lost',
    FOR_ADOPTION: '/pets/adoption',
    UPLOAD_PHOTOS: (id: string) => `/pets/${id}/photos`,
    REPORT_LOST: (id: string) => `/pets/${id}/lost`,
    MARK_FOUND: (id: string) => `/pets/${id}/found`,
    SEARCH: '/pets/search',
  },

  // Medical Records
  MEDICAL_RECORDS: {
    BASE: '/medical-records',
    BY_ID: (id: string) => `/medical-records/${id}`,
    BY_PET: (petId: string) => `/medical-records/pet/${petId}`,
    BY_VET: (vetId: string) => `/medical-records/vet/${vetId}`,
    BY_DATE_RANGE: (petId: string) => `/medical-records/pet/${petId}/date-range`,
    UPLOAD_ATTACHMENTS: (id: string) => `/medical-records/${id}/attachments`,
  },

  // Products
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string) => `/products/${id}`,
    BY_CATEGORY: (category: string) => `/products/category/${category}`,
    BY_BRAND: (brand: string) => `/products/brand/${brand}`,
    BY_SPECIES: '/products/species',
    SEARCH: '/products/search',
    FEATURED: '/products/featured',
    RELATED: (id: string) => `/products/${id}/related`,
    UPDATE_STOCK: (id: string) => `/products/${id}/stock`,
    UPLOAD_IMAGES: (id: string) => `/products/${id}/images`,
  },

  // Cart
  CART: {
    BASE: '/cart',
    USER_CART: (userId: string) => `/cart/${userId}`,
    ADD_ITEM: (userId: string) => `/cart/${userId}/items`,
    UPDATE_ITEM: (userId: string, productId: string) => `/cart/${userId}/items/${productId}`,
    REMOVE_ITEM: (userId: string, productId: string) => `/cart/${userId}/items/${productId}`,
    CLEAR: (userId: string) => `/cart/${userId}/clear`,
    MERGE: '/cart/merge',
  },

  // Orders
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id: string) => `/orders/${id}`,
    BY_CUSTOMER: (customerId: string) => `/orders/customer/${customerId}`,
    BY_STATUS: (status: string) => `/orders/status/${status}`,
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
    ADD_TRACKING: (id: string) => `/orders/${id}/tracking`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    HISTORY: (customerId: string) => `/orders/customer/${customerId}/history`,
  },

  // Adoption
  ADOPTION: {
    LISTINGS: '/adoption/listings',
    LISTING_BY_ID: (id: string) => `/adoption/listings/${id}`,
    LISTINGS_BY_SHELTER: (shelterId: string) => `/adoption/listings/shelter/${shelterId}`,
    APPLICATIONS: '/adoption/applications',
    APPLICATION_BY_ID: (id: string) => `/adoption/applications/${id}`,
    UPDATE_APPLICATION_STATUS: (id: string) => `/adoption/applications/${id}/status`,
    WITHDRAW_APPLICATION: (id: string) => `/adoption/applications/${id}/withdraw`,
  },

  // Consultations
  CONSULTATIONS: {
    BASE: '/consultations',
    BY_ID: (id: string) => `/consultations/${id}`,
    BY_VET: (vetId: string) => `/consultations/vet/${vetId}`,
    BY_PET_OWNER: (petOwnerId: string) => `/consultations/pet-owner/${petOwnerId}`,
    BY_PET: (petId: string) => `/consultations/pet/${petId}`,
    BY_DATE_RANGE: '/consultations/date-range',
    UPCOMING: '/consultations/upcoming',
    UPDATE_STATUS: (id: string) => `/consultations/${id}/status`,
    ADD_NOTES: (id: string) => `/consultations/${id}/notes`,
    UPLOAD_FILES: (id: string) => `/consultations/${id}/files`,
    RESCHEDULE: (id: string) => `/consultations/${id}/reschedule`,
    CANCEL: (id: string) => `/consultations/${id}/cancel`,
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',
    BY_ID: (id: string) => `/notifications/${id}`,
    BY_USER: (userId: string) => `/notifications/user/${userId}`,
    UNREAD: (userId: string) => `/notifications/user/${userId}/unread`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: (userId: string) => `/notifications/user/${userId}/read-all`,
    COUNT: (userId: string) => `/notifications/user/${userId}/count`,
  },

  // Files
  FILES: {
    UPLOAD: '/files/upload',
    UPLOAD_MULTIPLE: '/files/upload-multiple',
    DELETE: (fileName: string) => `/files/${fileName}`,
    GET_URL: (fileName: string) => `/files/${fileName}/url`,
  },

  // Search
  SEARCH: {
    GLOBAL: '/search',
    USERS: '/search/users',
    VETS: '/search/vets',
    PETS: '/search/pets',
    PRODUCTS: '/search/products',
    ADOPTIONS: '/search/adoptions',
    SUGGESTIONS: '/search/suggestions',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    USER_GROWTH: '/analytics/user-growth',
    ORDER_ANALYTICS: '/analytics/orders',
    POPULAR_PRODUCTS: '/analytics/products/popular',
    ADOPTION_STATS: '/analytics/adoptions',
    VET_PERFORMANCE: '/analytics/vets/performance',
  },
} as const; 