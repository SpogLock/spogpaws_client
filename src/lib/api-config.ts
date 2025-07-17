// API Configuration for Spogpaws Platform
// Based on documented API structure
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

// API Endpoints Configuration (based on documented API)
export const API_ENDPOINTS = {
  // User Management APIs
  USER: {
    SIGNUP: '/user/signup',
    LOGIN: '/user/login',
    GET_ALL: '/user/',
    UPDATE: (userId: number) => `/user/update/${userId}`,
    DELETE: (userId: number) => `/user/delete/${userId}`,
    RESET_PASSWORD: (userId: number) => `/user/reset-password/${userId}`,
  },

  // Clinic Management APIs
  CLINIC: {
    CREATE: '/clinic/create-clinic',
    GET_ALL: '/clinic/get-clinics',
    GET_BY_ID: (clinicId: number) => `/clinic/get-clinic-by-id/${clinicId}`,
    UPDATE: (clinicId: number) => `/clinic/update-clinic/${clinicId}`,
    REQUEST_APPROVAL: (clinicId: number) => `/clinic/approval/${clinicId}`,
  },

  // Pet Adoption APIs
  ADOPTION: {
    GET_ALL: '/adoption/get-adoptions',
    GET_BY_ID: (id: number) => `/adoption/get-adoption/${id}`,
    CREATE: '/adoption/create-adoption',
    UPDATE: (id: number) => `/adoption/update-adoption/${id}`,
    DELETE: (id: number) => `/adoption/delete-adoption/${id}`,
  },
} as const; 