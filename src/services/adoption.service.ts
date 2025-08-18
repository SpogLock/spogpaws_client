// Adoption Service - Business Logic Layer
// Based on Spogpaws API structure
import { create } from 'zustand';
import {
  IAdoptionRepository,
  AdoptionDto,
  CreateAdoptionRequest,
  UpdateAdoptionRequest,
  LoadingState,
} from '@/types';
import { repositoryFactory } from '@/repositories';

// Adoption State Interface
interface AdoptionState {
  // State
  adoptions: AdoptionDto[];
  currentAdoption: AdoptionDto | null;
  loading: LoadingState;
  
  // Actions
  getAllAdoptions: () => Promise<AdoptionDto[]>;
  getAdoptionById: (id: number) => Promise<AdoptionDto>;
  createAdoption: (data: CreateAdoptionRequest) => Promise<AdoptionDto>;
  updateAdoption: (id: number, data: UpdateAdoptionRequest) => Promise<AdoptionDto>;
  deleteAdoption: (id: number) => Promise<void>;
  clearError: () => void;
  setLoading: (isLoading: boolean, error?: string) => void;
}

// Create Adoption Store
export const useAdoptionStore = create<AdoptionState>((set, get) => ({
  // Initial State
  adoptions: [],
  currentAdoption: null,
  loading: {
    isLoading: false,
    error: null,
  },

  // Actions
  getAllAdoptions: async (): Promise<AdoptionDto[]> => {
    const adoptionRepo = repositoryFactory.getAdoptionRepository();
    
    try {
      set({ loading: { isLoading: true, error: null } });
      
      const response = await adoptionRepo.getAllAdoptions();
      
      if (response.status === 'success' && response.data) {
        set({
          adoptions: response.data,
          loading: { isLoading: false, error: null },
        });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch adoptions');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch adoptions';
      set({
        loading: { isLoading: false, error: errorMessage },
      });
      throw error;
    }
  },

  getAdoptionById: async (id: number): Promise<AdoptionDto> => {
    const adoptionRepo = repositoryFactory.getAdoptionRepository();
    
    try {
      set({ loading: { isLoading: true, error: null } });
      
      const response = await adoptionRepo.getAdoptionById(id);
      
      if (response.status === 'success' && response.data) {
        set({
          currentAdoption: response.data,
          loading: { isLoading: false, error: null },
        });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch adoption');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch adoption';
      set({
        loading: { isLoading: false, error: errorMessage },
      });
      throw error;
    }
  },

  createAdoption: async (data: CreateAdoptionRequest): Promise<AdoptionDto> => {
    const adoptionRepo = repositoryFactory.getAdoptionRepository();
    
    try {
      set({ loading: { isLoading: true, error: null } });
      
      const response = await adoptionRepo.create(data);
      
      if (response.status === 'success' && response.data) {
        // Add new adoption to the list
        set((state) => ({
          adoptions: [...state.adoptions, response.data!],
          loading: { isLoading: false, error: null },
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create adoption listing');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create adoption listing';
      set({
        loading: { isLoading: false, error: errorMessage },
      });
      throw error;
    }
  },

  updateAdoption: async (id: number, data: UpdateAdoptionRequest): Promise<AdoptionDto> => {
    const adoptionRepo = repositoryFactory.getAdoptionRepository();
    
    try {
      set({ loading: { isLoading: true, error: null } });
      
      const response = await adoptionRepo.update(id.toString(), data);
      
      if (response.status === 'success' && response.data) {
        // Update adoption in the list
        set((state) => ({
          adoptions: state.adoptions.map(adoption => 
            adoption.id === id ? response.data! : adoption
          ),
          currentAdoption: state.currentAdoption?.id === id ? response.data! : state.currentAdoption,
          loading: { isLoading: false, error: null },
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update adoption listing');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update adoption listing';
      set({
        loading: { isLoading: false, error: errorMessage },
      });
      throw error;
    }
  },

  deleteAdoption: async (id: number): Promise<void> => {
    const adoptionRepo = repositoryFactory.getAdoptionRepository();
    
    try {
      set({ loading: { isLoading: true, error: null } });
      
      const response = await adoptionRepo.delete(id.toString());
      
      if (response.status === 'success') {
        // Remove adoption from the list
        set((state) => ({
          adoptions: state.adoptions.filter(adoption => adoption.id !== id),
          currentAdoption: state.currentAdoption?.id === id ? null : state.currentAdoption,
          loading: { isLoading: false, error: null },
        }));
      } else {
        throw new Error(response.message || 'Failed to delete adoption listing');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete adoption listing';
      set({
        loading: { isLoading: false, error: errorMessage },
      });
      throw error;
    }
  },

  clearError: () => {
    set((state) => ({
      loading: { ...state.loading, error: null },
    }));
  },

  setLoading: (isLoading: boolean, error?: string) => {
    set({
      loading: { isLoading, error: error || null },
    });
  },
}));

// Adoption Service Class for additional business logic
export class AdoptionService {
  private static instance: AdoptionService;

  private constructor() {}

  public static getInstance(): AdoptionService {
    if (!AdoptionService.instance) {
      AdoptionService.instance = new AdoptionService();
    }
    return AdoptionService.instance;
  }

  // Business logic methods
  async validateAdoptionForm(data: CreateAdoptionRequest): Promise<string[]> {
    const errors: string[] = [];

    if (!data.petName.trim()) {
      errors.push('Pet name is required');
    }

    if (!data.petType.trim()) {
      errors.push('Pet type is required');
    }

    if (!data.petBreed.trim()) {
      errors.push('Pet breed is required');
    }

    if (!data.petAge || data.petAge <= 0) {
      errors.push('Valid pet age is required');
    } else if (data.petAge > 30) {
      errors.push('Pet age seems unrealistic');
    }

    if (!data.description.trim()) {
      errors.push('Description is required');
    } else if (data.description.length < 20) {
      errors.push('Description should be at least 20 characters long');
    }

    if (!data.contactInfo.trim()) {
      errors.push('Contact information is required');
    } else if (!this.isValidContactInfo(data.contactInfo)) {
      errors.push('Please provide valid contact information (email or phone)');
    }

    if (!data.location.trim()) {
      errors.push('Location is required');
    }

    return errors;
  }

  async validateUpdateAdoptionForm(data: UpdateAdoptionRequest): Promise<string[]> {
    const errors: string[] = [];

    if (data.petName !== undefined && !data.petName.trim()) {
      errors.push('Pet name cannot be empty');
    }

    if (data.petType !== undefined && !data.petType.trim()) {
      errors.push('Pet type cannot be empty');
    }

    if (data.petBreed !== undefined && !data.petBreed.trim()) {
      errors.push('Pet breed cannot be empty');
    }

    if (data.petAge !== undefined) {
      if (data.petAge <= 0) {
        errors.push('Valid pet age is required');
      } else if (data.petAge > 30) {
        errors.push('Pet age seems unrealistic');
      }
    }

    if (data.description !== undefined) {
      if (!data.description.trim()) {
        errors.push('Description cannot be empty');
      } else if (data.description.length < 20) {
        errors.push('Description should be at least 20 characters long');
      }
    }

    if (data.contactInfo !== undefined) {
      if (!data.contactInfo.trim()) {
        errors.push('Contact information cannot be empty');
      } else if (!this.isValidContactInfo(data.contactInfo)) {
        errors.push('Please provide valid contact information (email or phone)');
      }
    }

    if (data.location !== undefined && !data.location.trim()) {
      errors.push('Location cannot be empty');
    }

    return errors;
  }

  private isValidContactInfo(contactInfo: string): boolean {
    // Check if it's a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(contactInfo)) {
      return true;
    }

    // Check if it's a valid phone number
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (phoneRegex.test(contactInfo.replace(/\s/g, ''))) {
      return true;
    }

    return false;
  }

  // Helper methods
  getCurrentAdoptions(): AdoptionDto[] {
    return useAdoptionStore.getState().adoptions;
  }

  getCurrentAdoption(): AdoptionDto | null {
    return useAdoptionStore.getState().currentAdoption;
  }

  isLoading(): boolean {
    return useAdoptionStore.getState().loading.isLoading;
  }

  getError(): string | null {
    return useAdoptionStore.getState().loading.error ?? null;
  }

  // Filter methods for UI
  filterByPetType(petType: string): AdoptionDto[] {
    return this.getCurrentAdoptions().filter(adoption => 
      adoption.petType.toLowerCase() === petType.toLowerCase()
    );
  }

  filterByLocation(location: string): AdoptionDto[] {
    return this.getCurrentAdoptions().filter(adoption => 
      adoption.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  searchAdoptions(query: string): AdoptionDto[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getCurrentAdoptions().filter(adoption => 
      adoption.petName.toLowerCase().includes(lowercaseQuery) ||
      adoption.petType.toLowerCase().includes(lowercaseQuery) ||
      adoption.petBreed.toLowerCase().includes(lowercaseQuery) ||
      adoption.description.toLowerCase().includes(lowercaseQuery) ||
      adoption.location.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// Export singleton instance
export const adoptionService = AdoptionService.getInstance(); 