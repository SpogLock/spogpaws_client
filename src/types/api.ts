// API Types for Spog Paws Platform
// Data Transfer Objects (DTOs) for API communication

// Base API Response Structure
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ApiError[];
  timestamp: string;
  path: string;
}

export interface ApiError {
  field?: string;
  message: string;
  code: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Authentication DTOs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// User DTOs
export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture?: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  address?: AddressDto;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  address?: AddressDto;
}

export interface AddressDto {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Vet DTOs
export interface VetDto extends UserDto {
  licenseNumber: string;
  specialization: string[];
  clinicName: string;
  clinicAddress: AddressDto;
  availableHours: AvailableHoursDto[];
  rating: number;
  totalReviews: number;
  consultationFee: number;
  isOnline: boolean;
}

export interface AvailableHoursDto {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface CreateVetRequest {
  licenseNumber: string;
  specialization: string[];
  clinicName: string;
  clinicAddress: AddressDto;
  consultationFee: number;
}

export interface UpdateVetRequest {
  licenseNumber?: string;
  specialization?: string[];
  clinicName?: string;
  clinicAddress?: AddressDto;
  consultationFee?: number;
  availableHours?: AvailableHoursDto[];
}

// Pet DTOs
export interface PetDto {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  gender: string;
  color: string;
  description: string;
  photos: string[];
  ownerId: string;
  microchipId?: string;
  isLost: boolean;
  isForAdoption: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePetRequest {
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  gender: string;
  color: string;
  description: string;
  photos: string[];
  microchipId?: string;
}

export interface UpdatePetRequest {
  name?: string;
  breed?: string;
  age?: number;
  weight?: number;
  color?: string;
  description?: string;
  photos?: string[];
  microchipId?: string;
  isLost?: boolean;
  isForAdoption?: boolean;
}

// Medical Record DTOs
export interface MedicalRecordDto {
  id: string;
  petId: string;
  vetId: string;
  diagnosis: string;
  treatment: string;
  medications: MedicationDto[];
  followUpDate?: string;
  notes: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicationDto {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface CreateMedicalRecordRequest {
  petId: string;
  diagnosis: string;
  treatment: string;
  medications: MedicationDto[];
  followUpDate?: string;
  notes: string;
  attachments?: string[];
}

// Product DTOs
export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  weight?: number;
  dimensions?: DimensionsDto;
  targetSpecies: string[];
  tags: string[];
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface DimensionsDto {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  stockQuantity: number;
  weight?: number;
  dimensions?: DimensionsDto;
  targetSpecies: string[];
  tags: string[];
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  images?: string[];
  stockQuantity?: number;
  weight?: number;
  dimensions?: DimensionsDto;
  tags?: string[];
}

export interface ProductSearchRequest {
  query?: string;
  category?: string;
  species?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

// Cart DTOs
export interface CartDto {
  id: string;
  userId: string;
  items: CartItemDto[];
  totalAmount: number;
  updatedAt: string;
}

export interface CartItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: ProductDto;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Order DTOs
export interface OrderDto {
  id: string;
  customerId: string;
  items: OrderItemDto[];
  totalAmount: number;
  shippingAddress: AddressDto;
  billingAddress: AddressDto;
  status: string;
  paymentMethod: string;
  shippingMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: ProductDto;
}

export interface CreateOrderRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: AddressDto;
  billingAddress: AddressDto;
  paymentMethod: string;
  shippingMethod: string;
}

// Adoption DTOs
export interface AdoptionListingDto {
  id: string;
  petId: string;
  shelterId: string;
  title: string;
  description: string;
  adoptionFee: number;
  requirements: string[];
  status: string;
  pet: PetDto;
  shelter: UserDto;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdoptionListingRequest {
  petId: string;
  title: string;
  description: string;
  adoptionFee: number;
  requirements: string[];
}

export interface AdoptionApplicationDto {
  id: string;
  listingId: string;
  applicantId: string;
  livingArrangement: LivingArrangementDto;
  experienceWithPets: string;
  reasonForAdoption: string;
  veterinarianReference?: string;
  status: string;
  reviewNotes?: string;
  applicant: UserDto;
  listing: AdoptionListingDto;
  createdAt: string;
  updatedAt: string;
}

export interface LivingArrangementDto {
  housingType: string;
  hasYard: boolean;
  hasOtherPets: boolean;
  householdMembers: number;
  hasChildren: boolean;
  childrenAges?: number[];
}

export interface CreateAdoptionApplicationRequest {
  listingId: string;
  livingArrangement: LivingArrangementDto;
  experienceWithPets: string;
  reasonForAdoption: string;
  veterinarianReference?: string;
}

// Consultation DTOs
export interface VetConsultationDto {
  id: string;
  vetId: string;
  petOwnerId: string;
  petId: string;
  scheduledDate: string;
  duration: number;
  type: string;
  status: string;
  reason: string;
  diagnosis?: string;
  prescription?: MedicationDto[];
  followUpRequired: boolean;
  followUpDate?: string;
  fee: number;
  notes: string;
  attachments: string[];
  vet: VetDto;
  petOwner: UserDto;
  pet: PetDto;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConsultationRequest {
  vetId: string;
  petId: string;
  scheduledDate: string;
  duration: number;
  type: string;
  reason: string;
}

export interface UpdateConsultationRequest {
  scheduledDate?: string;
  duration?: number;
  reason?: string;
  diagnosis?: string;
  prescription?: MedicationDto[];
  followUpRequired?: boolean;
  followUpDate?: string;
  notes?: string;
}

// File Upload DTOs
export interface FileUploadResponse {
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

// Search and Filter DTOs
export interface SearchRequest {
  query: string;
  type?: 'PETS' | 'VETS' | 'PRODUCTS' | 'ADOPTIONS';
  filters?: Record<string, any>;
  page?: number;
  size?: number;
}

export interface SearchResponse<T> {
  results: T[];
  totalResults: number;
  page: number;
  size: number;
  totalPages: number;
}

// WebSocket Message DTOs
export interface WebSocketMessage<T = any> {
  type: string;
  payload: T;
  timestamp: string;
  sender?: string;
}

export interface ChatMessage {
  id: string;
  consultationId: string;
  senderId: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// Notification DTOs
export interface NotificationDto {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  relatedEntityId?: string;
  relatedEntityType?: string;
  createdAt: string;
}

export interface CreateNotificationRequest {
  userId: string;
  title: string;
  message: string;
  type: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
} 