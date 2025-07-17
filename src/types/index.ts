// Centralized type exports for Spogpaws Platform
// Updated to match documented API structure

// API Types
export type {
  ApiResponse,
  ApiError,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserDto,
  UpdateUserRequest,
  ResetPasswordRequest,
  ClinicDto,
  CreateClinicRequest,
  UpdateClinicRequest,
  AdoptionDto,
  CreateAdoptionRequest,
  UpdateAdoptionRequest,
  LoadingState,
} from './api';

// Domain Types
export type {
  BaseEntity,
  User,
  Clinic,
  Adoption,
  AuthState,
} from './domain';

// Interface Types
export type {
  IHttpClient,
  IApiConfig,
  IBaseRepository,
  IAuthRepository,
  IClinicRepository,
  IAdoptionRepository,
  IAuthState,
  IClinicState,
  IAdoptionState,
} from './interfaces';

// Enum Re-exports
export { UserRole } from './domain'; 