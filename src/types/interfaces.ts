// Interface definitions for Spogpaws Platform
// Simplified to match documented API structure

import { 
  ApiResponse, 
  UserDto, 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest,
  RegisterResponse,
  UpdateUserRequest,
  ResetPasswordRequest,
  ClinicDto,
  CreateClinicRequest,
  UpdateClinicRequest,
  AdoptionDto,
  CreateAdoptionRequest,
  UpdateAdoptionRequest,
  LoadingState
} from './api';

// HTTP Client Interface
export interface IHttpClient {
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, data?: any, config?: any): Promise<T>;
  put<T>(url: string, data?: any, config?: any): Promise<T>;
  patch<T>(url: string, data?: any, config?: any): Promise<T>;
  delete<T>(url: string, config?: any): Promise<T>;
  setAuthToken(token: string): void;
  removeAuthToken(): void;
}

// API Configuration Interface
export interface IApiConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
  retryAttempts: number;
  retryDelay: number;
}

// Repository Interfaces
export interface IBaseRepository<T, TCreate, TUpdate> {
  findById(id: string): Promise<ApiResponse<T>>;
  findAll(): Promise<ApiResponse<T[]>>;
  create(data: TCreate): Promise<ApiResponse<T>>;
  update(id: string, data: TUpdate): Promise<ApiResponse<T>>;
  delete(id: string): Promise<ApiResponse<void>>;
}

export interface IAuthRepository {
  login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>>;
  register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>>;
  logout(): Promise<ApiResponse<void>>;
  getCurrentUser(): Promise<ApiResponse<UserDto>>;
  getAllUsers(): Promise<ApiResponse<UserDto[]>>;
  updateUser(userId: number, data: UpdateUserRequest): Promise<ApiResponse<UserDto>>;
  deleteUser(userId: number): Promise<ApiResponse<void>>;
  resetPassword(userId: number, data: ResetPasswordRequest): Promise<ApiResponse<void>>;
}

export interface IClinicRepository extends IBaseRepository<ClinicDto, CreateClinicRequest, UpdateClinicRequest> {
  getAllClinics(): Promise<ApiResponse<ClinicDto[]>>;
  getClinicById(clinicId: number): Promise<ApiResponse<ClinicDto>>;
  requestApproval(clinicId: number): Promise<ApiResponse<void>>;
}

export interface IAdoptionRepository extends IBaseRepository<AdoptionDto, CreateAdoptionRequest, UpdateAdoptionRequest> {
  getAllAdoptions(): Promise<ApiResponse<AdoptionDto[]>>;
  getAdoptionById(id: number): Promise<ApiResponse<AdoptionDto>>;
}

// State Management Interfaces
export interface IAuthState {
  user: UserDto | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: LoadingState;
  login: (credentials: LoginRequest) => Promise<UserDto>;
  register: (userData: RegisterRequest) => Promise<UserDto>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<UserDto>;
  clearError: () => void;
  setLoading: (isLoading: boolean, error?: string) => void;
}

export interface IClinicState {
  clinics: ClinicDto[];
  currentClinic: ClinicDto | null;
  loading: LoadingState;
  getAllClinics: () => Promise<ClinicDto[]>;
  getClinicById: (id: number) => Promise<ClinicDto>;
  createClinic: (data: CreateClinicRequest) => Promise<ClinicDto>;
  updateClinic: (id: number, data: UpdateClinicRequest) => Promise<ClinicDto>;
  requestApproval: (id: number) => Promise<void>;
  clearError: () => void;
  setLoading: (isLoading: boolean, error?: string) => void;
}

export interface IAdoptionState {
  adoptions: AdoptionDto[];
  currentAdoption: AdoptionDto | null;
  loading: LoadingState;
  getAllAdoptions: () => Promise<AdoptionDto[]>;
  getAdoptionById: (id: number) => Promise<AdoptionDto>;
  createAdoption: (data: CreateAdoptionRequest) => Promise<AdoptionDto>;
  updateAdoption: (id: number, data: UpdateAdoptionRequest) => Promise<AdoptionDto>;
  deleteAdoption: (id: number) => Promise<void>;
  clearError: () => void;
  setLoading: (isLoading: boolean, error?: string) => void;
} 