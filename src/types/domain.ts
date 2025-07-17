// Domain Types for Spogpaws Platform
// Simplified to match documented API structure

export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// User Management Types (simplified to match API)
export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

// Clinic Management Types  
export interface Clinic extends BaseEntity {
  clinicId: number;
  clinicName: string;
  openingHours: string;
  about: string;
  userId: number;
}

// Pet Adoption Types
export interface Adoption extends BaseEntity {
  petName: string;
  petType: string;
  petBreed: string;
  petAge: number;
  description: string;
  contactInfo: string;
  location: string;
  adoptionDate: string;
}

// Application State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: LoadingState;
} 