// Repository Factory and Exports
// Updated for Spogpaws API structure
import { HttpClient } from '@/lib/http-client';
import { getEnvironmentConfig } from '@/lib/api-config';
import { 
  IHttpClient, 
  IAuthRepository, 
  IClinicRepository,
  IAdoptionRepository
} from '@/types';

import { AuthRepository } from './auth.repository';
import { ClinicRepository } from './clinic.repository';
import { AdoptionRepository } from './adoption.repository';

// Repository Factory Class
class RepositoryFactory {
  private httpClient: IHttpClient;
  private authRepository: IAuthRepository | null = null;
  private clinicRepository: IClinicRepository | null = null;
  private adoptionRepository: IAdoptionRepository | null = null;

  constructor() {
    const config = getEnvironmentConfig();
    this.httpClient = new HttpClient(config);
  }

  getAuthRepository(): IAuthRepository {
    if (!this.authRepository) {
      this.authRepository = new AuthRepository(this.httpClient);
    }
    return this.authRepository;
  }

  getClinicRepository(): IClinicRepository {
    if (!this.clinicRepository) {
      this.clinicRepository = new ClinicRepository(this.httpClient);
    }
    return this.clinicRepository;
  }

  getAdoptionRepository(): IAdoptionRepository {
    if (!this.adoptionRepository) {
      this.adoptionRepository = new AdoptionRepository(this.httpClient);
    }
    return this.adoptionRepository;
  }

  getHttpClient(): IHttpClient {
    return this.httpClient;
  }

  // Reset all repositories (useful for testing or auth changes)
  reset(): void {
    this.authRepository = null;
    this.clinicRepository = null;
    this.adoptionRepository = null;
  }
}

// Singleton instance
export const repositoryFactory = new RepositoryFactory();

// Individual exports for direct import
export { AuthRepository } from './auth.repository';
export { ClinicRepository } from './clinic.repository';
export { AdoptionRepository } from './adoption.repository';
export { BaseRepository } from './base.repository'; 