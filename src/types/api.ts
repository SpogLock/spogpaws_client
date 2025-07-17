// API Types for Spogpaws Platform
// Based on documented API structure

// Base API Response Structure (matches documentation)
export interface ApiResponse<T = any> {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data?: T;
}

export interface ApiError {
  status: "error";
  statusCode: number;
  message: string;
}

// Authentication DTOs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  name: string;
  role: string;
  user_id: number;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface RegisterResponse {
  email: string;
  name: string;
  user_id: number;
  role: string;
}

// User DTOs
export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
}

// Clinic DTOs
export interface ClinicDto {
  clinicId: number;
  clinicName: string;
  openingHours: string;
  about: string;
  userId?: number;
}

export interface CreateClinicRequest {
  clinicName: string;
  openingHours: string;
  about: string;
  userId: number;
}

export interface UpdateClinicRequest {
  clinicName?: string;
  openingHours?: string;
  about?: string;
}

// Adoption DTOs
export interface AdoptionDto {
  id: number;
  petName: string;
  petType: string;
  petBreed: string;
  petAge: number;
  description: string;
  contactInfo: string;
  location: string;
  adoptionDate: string; // ISO date string
}

export interface CreateAdoptionRequest {
  petName: string;
  petType: string;
  petBreed: string;
  petAge: number;
  description: string;
  contactInfo: string;
  location: string;
}

export interface UpdateAdoptionRequest {
  petName?: string;
  petType?: string;
  petBreed?: string;
  petAge?: number;
  description?: string;
  contactInfo?: string;
  location?: string;
}

// Loading state for UI
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
} 