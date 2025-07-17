// Repository Index - Centralized repository exports and factory
import { HttpClient } from '@/lib/http-client';
import { getEnvironmentConfig } from '@/lib/api-config';
import { AuthRepository } from './auth.repository';
import { VetRepository } from './vet.repository';
import {
  IAuthRepository,
  IVetRepository,
  IHttpClient,
} from '@/types';

// Initialize HTTP client with environment config
const createHttpClient = (): IHttpClient => {
  const config = getEnvironmentConfig();
  return new HttpClient(config);
};

// Repository factory class following Dependency Injection pattern
export class RepositoryFactory {
  private static instance: RepositoryFactory;
  private httpClient: IHttpClient;

  private constructor() {
    this.httpClient = createHttpClient();
  }

  public static getInstance(): RepositoryFactory {
    if (!RepositoryFactory.instance) {
      RepositoryFactory.instance = new RepositoryFactory();
    }
    return RepositoryFactory.instance;
  }

  // Repository getters
  public getAuthRepository(): IAuthRepository {
    return new AuthRepository(this.httpClient);
  }

  public getVetRepository(): IVetRepository {
    return new VetRepository(this.httpClient);
  }

  // Method to get HTTP client for custom repositories
  public getHttpClient(): IHttpClient {
    return this.httpClient;
  }

  // Method to reset HTTP client (useful for testing)
  public resetHttpClient(): void {
    this.httpClient = createHttpClient();
  }
}

// Convenience exports for direct usage
export const repositoryFactory = RepositoryFactory.getInstance();

// Individual repository exports
export { AuthRepository } from './auth.repository';
export { VetRepository } from './vet.repository';
export { BaseRepository } from './base.repository';

// Type exports
export type {
  IAuthRepository,
  IVetRepository,
  IHttpClient,
} from '@/types'; 