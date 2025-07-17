// Repository Interfaces for Dependency Inversion Principle
// These interfaces define contracts for data access layer

import {
  ApiResponse,
  PaginatedResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  UserDto,
  CreateUserRequest,
  UpdateUserRequest,
  VetDto,
  CreateVetRequest,
  UpdateVetRequest,
  PetDto,
  CreatePetRequest,
  UpdatePetRequest,
  MedicalRecordDto,
  CreateMedicalRecordRequest,
  ProductDto,
  CreateProductRequest,
  UpdateProductRequest,
  ProductSearchRequest,
  CartDto,
  AddToCartRequest,
  UpdateCartItemRequest,
  OrderDto,
  CreateOrderRequest,
  AdoptionListingDto,
  CreateAdoptionListingRequest,
  AdoptionApplicationDto,
  CreateAdoptionApplicationRequest,
  VetConsultationDto,
  CreateConsultationRequest,
  UpdateConsultationRequest,
  FileUploadResponse,
  SearchRequest,
  SearchResponse,
  NotificationDto,
  CreateNotificationRequest
} from './api';

// Base Repository Interface
export interface IBaseRepository<T, TCreate, TUpdate> {
  findById(id: string): Promise<ApiResponse<T>>;
  findAll(page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<T>>>;
  create(data: TCreate): Promise<ApiResponse<T>>;
  update(id: string, data: TUpdate): Promise<ApiResponse<T>>;
  delete(id: string): Promise<ApiResponse<void>>;
}

// Authentication Repository Interface
export interface IAuthRepository {
  login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>>;
  register(userData: RegisterRequest): Promise<ApiResponse<LoginResponse>>;
  logout(): Promise<ApiResponse<void>>;
  refreshToken(token: RefreshTokenRequest): Promise<ApiResponse<LoginResponse>>;
  verifyEmail(token: string): Promise<ApiResponse<void>>;
  forgotPassword(email: string): Promise<ApiResponse<void>>;
  resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>>;
  getCurrentUser(): Promise<ApiResponse<UserDto>>;
}

// User Repository Interface
export interface IUserRepository extends IBaseRepository<UserDto, CreateUserRequest, UpdateUserRequest> {
  findByEmail(email: string): Promise<ApiResponse<UserDto>>;
  findByRole(role: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<UserDto>>>;
  updateProfile(id: string, data: UpdateUserRequest): Promise<ApiResponse<UserDto>>;
  uploadProfilePicture(id: string, file: File): Promise<ApiResponse<FileUploadResponse>>;
  verifyUser(id: string): Promise<ApiResponse<UserDto>>;
  deactivateUser(id: string): Promise<ApiResponse<void>>;
}

// Vet Repository Interface
export interface IVetRepository extends IBaseRepository<VetDto, CreateVetRequest, UpdateVetRequest> {
  findBySpecialization(specialization: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<VetDto>>>;
  findByLocation(city: string, state: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<VetDto>>>;
  findAvailableVets(date: string, time: string): Promise<ApiResponse<VetDto[]>>;
  searchVets(query: string, filters: Record<string, any>): Promise<ApiResponse<SearchResponse<VetDto>>>;
  updateAvailability(id: string, isOnline: boolean): Promise<ApiResponse<VetDto>>;
  getVetReviews(id: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<any>>>;
}

// Pet Repository Interface
export interface IPetRepository extends IBaseRepository<PetDto, CreatePetRequest, UpdatePetRequest> {
  findByOwner(ownerId: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<PetDto>>>;
  findBySpecies(species: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<PetDto>>>;
  findLostPets(location?: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<PetDto>>>;
  findPetsForAdoption(filters?: Record<string, any>, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<PetDto>>>;
  uploadPetPhotos(id: string, files: File[]): Promise<ApiResponse<FileUploadResponse[]>>;
  reportLost(id: string): Promise<ApiResponse<PetDto>>;
  markFound(id: string): Promise<ApiResponse<PetDto>>;
  searchPets(query: string, filters: Record<string, any>): Promise<ApiResponse<SearchResponse<PetDto>>>;
}

// Medical Record Repository Interface
export interface IMedicalRecordRepository extends IBaseRepository<MedicalRecordDto, CreateMedicalRecordRequest, Partial<CreateMedicalRecordRequest>> {
  findByPet(petId: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<MedicalRecordDto>>>;
  findByVet(vetId: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<MedicalRecordDto>>>;
  findByDateRange(petId: string, startDate: string, endDate: string): Promise<ApiResponse<MedicalRecordDto[]>>;
  uploadAttachments(id: string, files: File[]): Promise<ApiResponse<FileUploadResponse[]>>;
}

// Product Repository Interface
export interface IProductRepository extends IBaseRepository<ProductDto, CreateProductRequest, UpdateProductRequest> {
  findByCategory(category: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<ProductDto>>>;
  findByBrand(brand: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<ProductDto>>>;
  findBySpecies(species: string[], page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<ProductDto>>>;
  searchProducts(searchRequest: ProductSearchRequest): Promise<ApiResponse<PaginatedResponse<ProductDto>>>;
  getFeaturedProducts(limit?: number): Promise<ApiResponse<ProductDto[]>>;
  getRelatedProducts(productId: string, limit?: number): Promise<ApiResponse<ProductDto[]>>;
  updateStock(id: string, quantity: number): Promise<ApiResponse<ProductDto>>;
  uploadProductImages(id: string, files: File[]): Promise<ApiResponse<FileUploadResponse[]>>;
}

// Cart Repository Interface
export interface ICartRepository {
  getCart(userId: string): Promise<ApiResponse<CartDto>>;
  addToCart(userId: string, item: AddToCartRequest): Promise<ApiResponse<CartDto>>;
  updateCartItem(userId: string, productId: string, data: UpdateCartItemRequest): Promise<ApiResponse<CartDto>>;
  removeFromCart(userId: string, productId: string): Promise<ApiResponse<CartDto>>;
  clearCart(userId: string): Promise<ApiResponse<void>>;
  mergeCarts(guestCartId: string, userId: string): Promise<ApiResponse<CartDto>>;
}

// Order Repository Interface
export interface IOrderRepository extends IBaseRepository<OrderDto, CreateOrderRequest, Partial<CreateOrderRequest>> {
  findByCustomer(customerId: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<OrderDto>>>;
  findByStatus(status: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<OrderDto>>>;
  updateOrderStatus(id: string, status: string): Promise<ApiResponse<OrderDto>>;
  addTrackingNumber(id: string, trackingNumber: string): Promise<ApiResponse<OrderDto>>;
  cancelOrder(id: string, reason?: string): Promise<ApiResponse<OrderDto>>;
  getOrderHistory(customerId: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<OrderDto>>>;
}

// Adoption Repository Interface
export interface IAdoptionRepository {
  // Adoption Listings
  getAdoptionListings(filters?: Record<string, any>, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<AdoptionListingDto>>>;
  getAdoptionListing(id: string): Promise<ApiResponse<AdoptionListingDto>>;
  createAdoptionListing(data: CreateAdoptionListingRequest): Promise<ApiResponse<AdoptionListingDto>>;
  updateAdoptionListing(id: string, data: Partial<CreateAdoptionListingRequest>): Promise<ApiResponse<AdoptionListingDto>>;
  deleteAdoptionListing(id: string): Promise<ApiResponse<void>>;
  findListingsByShelter(shelterId: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<AdoptionListingDto>>>;
  
  // Adoption Applications
  getAdoptionApplications(listingId?: string, applicantId?: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<AdoptionApplicationDto>>>;
  getAdoptionApplication(id: string): Promise<ApiResponse<AdoptionApplicationDto>>;
  createAdoptionApplication(data: CreateAdoptionApplicationRequest): Promise<ApiResponse<AdoptionApplicationDto>>;
  updateApplicationStatus(id: string, status: string, reviewNotes?: string): Promise<ApiResponse<AdoptionApplicationDto>>;
  withdrawApplication(id: string): Promise<ApiResponse<AdoptionApplicationDto>>;
}

// Consultation Repository Interface
export interface IConsultationRepository extends IBaseRepository<VetConsultationDto, CreateConsultationRequest, UpdateConsultationRequest> {
  findByVet(vetId: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<VetConsultationDto>>>;
  findByPetOwner(petOwnerId: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<VetConsultationDto>>>;
  findByPet(petId: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<VetConsultationDto>>>;
  findByDateRange(startDate: string, endDate: string, vetId?: string): Promise<ApiResponse<VetConsultationDto[]>>;
  findUpcoming(vetId?: string, petOwnerId?: string): Promise<ApiResponse<VetConsultationDto[]>>;
  updateConsultationStatus(id: string, status: string): Promise<ApiResponse<VetConsultationDto>>;
  addConsultationNotes(id: string, notes: string): Promise<ApiResponse<VetConsultationDto>>;
  uploadConsultationFiles(id: string, files: File[]): Promise<ApiResponse<FileUploadResponse[]>>;
  rescheduleConsultation(id: string, newDate: string): Promise<ApiResponse<VetConsultationDto>>;
  cancelConsultation(id: string, reason?: string): Promise<ApiResponse<VetConsultationDto>>;
}

// Notification Repository Interface
export interface INotificationRepository extends IBaseRepository<NotificationDto, CreateNotificationRequest, Partial<CreateNotificationRequest>> {
  findByUser(userId: string, page?: number, size?: number): Promise<ApiResponse<PaginatedResponse<NotificationDto>>>;
  findUnread(userId: string): Promise<ApiResponse<NotificationDto[]>>;
  markAsRead(id: string): Promise<ApiResponse<NotificationDto>>;
  markAllAsRead(userId: string): Promise<ApiResponse<void>>;
  getNotificationCount(userId: string): Promise<ApiResponse<{ total: number; unread: number }>>;
}

// File Repository Interface
export interface IFileRepository {
  uploadFile(file: File, category: string): Promise<ApiResponse<FileUploadResponse>>;
  uploadFiles(files: File[], category: string): Promise<ApiResponse<FileUploadResponse[]>>;
  deleteFile(fileName: string): Promise<ApiResponse<void>>;
  getFileUrl(fileName: string): Promise<ApiResponse<string>>;
}

// Search Repository Interface
export interface ISearchRepository {
  globalSearch(request: SearchRequest): Promise<ApiResponse<SearchResponse<any>>>;
  searchUsers(query: string, filters?: Record<string, any>): Promise<ApiResponse<SearchResponse<UserDto>>>;
  searchVets(query: string, filters?: Record<string, any>): Promise<ApiResponse<SearchResponse<VetDto>>>;
  searchPets(query: string, filters?: Record<string, any>): Promise<ApiResponse<SearchResponse<PetDto>>>;
  searchProducts(query: string, filters?: Record<string, any>): Promise<ApiResponse<SearchResponse<ProductDto>>>;
  searchAdoptions(query: string, filters?: Record<string, any>): Promise<ApiResponse<SearchResponse<AdoptionListingDto>>>;
  getSearchSuggestions(query: string, type?: string): Promise<ApiResponse<string[]>>;
}

// Analytics Repository Interface (for admin dashboard)
export interface IAnalyticsRepository {
  getDashboardStats(): Promise<ApiResponse<{
    totalUsers: number;
    totalPets: number;
    totalVets: number;
    totalOrders: number;
    totalRevenue: number;
    pendingAdoptions: number;
    activeConsultations: number;
  }>>;
  getUserGrowth(period: 'week' | 'month' | 'year'): Promise<ApiResponse<any[]>>;
  getOrderAnalytics(period: 'week' | 'month' | 'year'): Promise<ApiResponse<any[]>>;
  getPopularProducts(limit?: number): Promise<ApiResponse<ProductDto[]>>;
  getAdoptionStats(): Promise<ApiResponse<any>>;
  getVetPerformance(): Promise<ApiResponse<any[]>>;
}

// Configuration Interface
export interface IApiConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
  retryAttempts: number;
  retryDelay: number;
}

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