// Clinic Service - Business Logic Layer
// Based on Spogpaws API structure
import { create } from 'zustand';
import {
  IClinicRepository,
  ClinicDto,
  CreateClinicRequest,
  UpdateClinicRequest,
  LoadingState,
} from '@/types';
import { repositoryFactory } from '@/repositories';

// Clinic State Interface
interface ClinicState {
  // State
  clinics: ClinicDto[];
  currentClinic: ClinicDto | null;
  loading: LoadingState;
  
  // Actions
  getAllClinics: () => Promise<ClinicDto[]>;
  getClinicById: (id: number) => Promise<ClinicDto>;
  createClinic: (data: CreateClinicRequest) => Promise<ClinicDto>;
  updateClinic: (id: number, data: UpdateClinicRequest) => Promise<ClinicDto>;
  requestApproval: (id: number) => Promise<void>;
  clearError: () => void;
  setLoading: (isLoading: boolean, error?: string) => void;
}

// Create Clinic Store
export const useClinicStore = create<ClinicState>((set, get) => ({
  // Initial State
  clinics: [],
  currentClinic: null,
  loading: {
    isLoading: false,
    error: null,
  },

  // Actions
  getAllClinics: async (): Promise<ClinicDto[]> => {
    const clinicRepo = repositoryFactory.getClinicRepository();
    
    try {
      set({ loading: { isLoading: true, error: null } });
      
      const response = await clinicRepo.getAllClinics();
      
      if (response.status === 'success' && response.data) {
        set({
          clinics: response.data,
          loading: { isLoading: false, error: null },
        });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch clinics');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch clinics';
      set({
        loading: { isLoading: false, error: errorMessage },
      });
      throw error;
    }
  },

  getClinicById: async (id: number): Promise<ClinicDto> => {
    const clinicRepo = repositoryFactory.getClinicRepository();
    
    try {
      set({ loading: { isLoading: true, error: null } });
      
      const response = await clinicRepo.getClinicById(id);
      
      if (response.status === 'success' && response.data) {
        set({
          currentClinic: response.data,
          loading: { isLoading: false, error: null },
        });
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch clinic');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch clinic';
      set({
        loading: { isLoading: false, error: errorMessage },
      });
      throw error;
    }
  },

  createClinic: async (data: CreateClinicRequest): Promise<ClinicDto> => {
    const clinicRepo = repositoryFactory.getClinicRepository();
    
    try {
      set({ loading: { isLoading: true, error: null } });
      
      const response = await clinicRepo.create(data);
      
      if (response.status === 'success' && response.data) {
        // Add new clinic to the list
        set((state) => ({
          clinics: [...state.clinics, response.data!],
          loading: { isLoading: false, error: null },
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create clinic');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create clinic';
      set({
        loading: { isLoading: false, error: errorMessage },
      });
      throw error;
    }
  },

  updateClinic: async (id: number, data: UpdateClinicRequest): Promise<ClinicDto> => {
    const clinicRepo = repositoryFactory.getClinicRepository();
    
    try {
      set({ loading: { isLoading: true, error: null } });
      
      const response = await clinicRepo.update(id.toString(), data);
      
      if (response.status === 'success' && response.data) {
        // Update clinic in the list
        set((state) => ({
          clinics: state.clinics.map(clinic => 
            clinic.clinicId === id ? response.data! : clinic
          ),
          currentClinic: state.currentClinic?.clinicId === id ? response.data! : state.currentClinic,
          loading: { isLoading: false, error: null },
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update clinic');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update clinic';
      set({
        loading: { isLoading: false, error: errorMessage },
      });
      throw error;
    }
  },

  requestApproval: async (id: number): Promise<void> => {
    const clinicRepo = repositoryFactory.getClinicRepository();
    
    try {
      set({ loading: { isLoading: true, error: null } });
      
      const response = await clinicRepo.requestApproval(id);
      
      if (response.status === 'success') {
        set({ loading: { isLoading: false, error: null } });
      } else {
        throw new Error(response.message || 'Failed to request approval');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to request approval';
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

// Clinic Service Class for additional business logic
export class ClinicService {
  private static instance: ClinicService;

  private constructor() {}

  public static getInstance(): ClinicService {
    if (!ClinicService.instance) {
      ClinicService.instance = new ClinicService();
    }
    return ClinicService.instance;
  }

  // Business logic methods
  async validateClinicForm(data: CreateClinicRequest): Promise<string[]> {
    const errors: string[] = [];

    if (!data.clinicName.trim()) {
      errors.push('Clinic name is required');
    }

    if (!data.openingHours.trim()) {
      errors.push('Opening hours are required');
    }

    if (!data.about.trim()) {
      errors.push('About section is required');
    } else if (data.about.length < 50) {
      errors.push('About section should be at least 50 characters long');
    }

    if (!data.userId || data.userId <= 0) {
      errors.push('Valid user ID is required');
    }

    return errors;
  }

  async validateUpdateClinicForm(data: UpdateClinicRequest): Promise<string[]> {
    const errors: string[] = [];

    if (data.clinicName !== undefined && !data.clinicName.trim()) {
      errors.push('Clinic name cannot be empty');
    }

    if (data.openingHours !== undefined && !data.openingHours.trim()) {
      errors.push('Opening hours cannot be empty');
    }

    if (data.about !== undefined) {
      if (!data.about.trim()) {
        errors.push('About section cannot be empty');
      } else if (data.about.length < 50) {
        errors.push('About section should be at least 50 characters long');
      }
    }

    return errors;
  }

  // Helper methods
  getCurrentClinics(): ClinicDto[] {
    return useClinicStore.getState().clinics;
  }

  getCurrentClinic(): ClinicDto | null {
    return useClinicStore.getState().currentClinic;
  }

  isLoading(): boolean {
    return useClinicStore.getState().loading.isLoading;
  }

  getError(): string | null {
    return useClinicStore.getState().loading.error ?? null;
  }
}

// Export singleton instance
export const clinicService = ClinicService.getInstance(); 