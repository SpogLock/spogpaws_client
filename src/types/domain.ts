// Domain Types for Spog Paws Platform
// Following Domain-Driven Design principles

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Management Types
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture?: string;
  role: UserRole;
  isVerified: boolean;
  address?: Address;
}

export enum UserRole {
  PET_OWNER = 'PET_OWNER',
  VET = 'VET',
  ADMIN = 'ADMIN',
  SHELTER = 'SHELTER'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Veterinarian Specific Types
export interface Vet extends User {
  role: UserRole.VET;
  licenseNumber: string;
  specialization: string[];
  clinicName: string;
  clinicAddress: Address;
  availableHours: AvailableHours[];
  rating: number;
  totalReviews: number;
  consultationFee: number;
  isOnline: boolean;
}

export interface AvailableHours {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

// Pet Management Types
export interface Pet extends BaseEntity {
  name: string;
  species: PetSpecies;
  breed: string;
  age: number;
  weight: number;
  gender: Gender;
  color: string;
  description: string;
  photos: string[];
  ownerId: string;
  medicalHistory: MedicalRecord[];
  microchipId?: string;
  isLost: boolean;
  isForAdoption: boolean;
}

export enum PetSpecies {
  DOG = 'DOG',
  CAT = 'CAT',
  BIRD = 'BIRD',
  RABBIT = 'RABBIT',
  FISH = 'FISH',
  REPTILE = 'REPTILE',
  OTHER = 'OTHER'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN'
}

export interface MedicalRecord extends BaseEntity {
  petId: string;
  vetId: string;
  diagnosis: string;
  treatment: string;
  medications: Medication[];
  followUpDate?: Date;
  notes: string;
  attachments: string[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

// Adoption Types
export interface AdoptionListing extends BaseEntity {
  petId: string;
  shelterId: string;
  title: string;
  description: string;
  adoptionFee: number;
  requirements: string[];
  status: AdoptionStatus;
  interestedApplicants: string[];
}

export enum AdoptionStatus {
  AVAILABLE = 'AVAILABLE',
  PENDING = 'PENDING',
  ADOPTED = 'ADOPTED',
  REMOVED = 'REMOVED'
}

export interface AdoptionApplication extends BaseEntity {
  listingId: string;
  applicantId: string;
  livingArrangement: LivingArrangement;
  experienceWithPets: string;
  reasonForAdoption: string;
  veterinarianReference?: string;
  status: ApplicationStatus;
  reviewNotes?: string;
}

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN'
}

export interface LivingArrangement {
  housingType: HousingType;
  hasYard: boolean;
  hasOtherPets: boolean;
  householdMembers: number;
  hasChildren: boolean;
  childrenAges?: number[];
}

export enum HousingType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  CONDO = 'CONDO',
  FARM = 'FARM',
  OTHER = 'OTHER'
}

// Store Types
export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  brand: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  weight?: number;
  dimensions?: Dimensions;
  targetSpecies: PetSpecies[];
  tags: string[];
  rating: number;
  totalReviews: number;
}

export enum ProductCategory {
  FOOD = 'FOOD',
  TOYS = 'TOYS',
  ACCESSORIES = 'ACCESSORIES',
  HEALTH = 'HEALTH',
  GROOMING = 'GROOMING',
  TRAINING = 'TRAINING',
  HOUSING = 'HOUSING',
  TRAVEL = 'TRAVEL'
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'inches';
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface Order extends BaseEntity {
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: Address;
  billingAddress: Address;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant?: ProductVariant;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED'
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  STRIPE = 'STRIPE'
}

export enum ShippingMethod {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
  OVERNIGHT = 'OVERNIGHT',
  PICKUP = 'PICKUP'
}

// Consultation Types
export interface VetConsultation extends BaseEntity {
  vetId: string;
  petOwnerId: string;
  petId: string;
  scheduledDate: Date;
  duration: number; // in minutes
  type: ConsultationType;
  status: ConsultationStatus;
  reason: string;
  diagnosis?: string;
  prescription?: Medication[];
  followUpRequired: boolean;
  followUpDate?: Date;
  fee: number;
  notes: string;
  attachments: string[];
}

export enum ConsultationType {
  IN_PERSON = 'IN_PERSON',
  VIDEO_CALL = 'VIDEO_CALL',
  PHONE_CALL = 'PHONE_CALL',
  CHAT = 'CHAT',
  EMERGENCY = 'EMERGENCY'
}

export enum ConsultationStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
} 