// Veterinarian Repository Implementation
import {
  IVetRepository,
  IHttpClient,
  ApiResponse,
  PaginatedResponse,
  VetDto,
  CreateVetRequest,
  UpdateVetRequest,
  SearchResponse,
  FileUploadResponse,
} from '@/types';
import { BaseRepository } from './base.repository';
import { API_ENDPOINTS } from '@/lib/api-config';

export class VetRepository extends BaseRepository<VetDto, CreateVetRequest, UpdateVetRequest> implements IVetRepository {
  constructor(httpClient: IHttpClient) {
    super(httpClient, API_ENDPOINTS.VETS.BASE);
  }

  async findBySpecialization(
    specialization: string,
    page: number = 0,
    size: number = 20
  ): Promise<ApiResponse<PaginatedResponse<VetDto>>> {
    const queryParams = this.buildQueryParams({ page, size });
    return this.get<PaginatedResponse<VetDto>>(
      `${API_ENDPOINTS.VETS.BY_SPECIALIZATION(specialization)}${queryParams}`
    );
  }

  async findByLocation(
    city: string,
    state: string,
    page: number = 0,
    size: number = 20
  ): Promise<ApiResponse<PaginatedResponse<VetDto>>> {
    const queryParams = this.buildQueryParams({ city, state, page, size });
    return this.get<PaginatedResponse<VetDto>>(
      `${API_ENDPOINTS.VETS.BY_LOCATION}${queryParams}`
    );
  }

  async findAvailableVets(date: string, time: string): Promise<ApiResponse<VetDto[]>> {
    const queryParams = this.buildQueryParams({ date, time });
    return this.get<VetDto[]>(`${API_ENDPOINTS.VETS.AVAILABLE}${queryParams}`);
  }

  async searchVets(
    query: string,
    filters: Record<string, any>
  ): Promise<ApiResponse<SearchResponse<VetDto>>> {
    const searchPayload = {
      query,
      filters,
      type: 'VETS' as const,
    };

    return this.post<SearchResponse<VetDto>>(
      API_ENDPOINTS.VETS.SEARCH,
      searchPayload
    );
  }

  async updateAvailability(id: string, isOnline: boolean): Promise<ApiResponse<VetDto>> {
    return this.patch<VetDto>(
      API_ENDPOINTS.VETS.AVAILABILITY(id),
      { isOnline }
    );
  }

  async getVetReviews(
    id: string,
    page: number = 0,
    size: number = 20
  ): Promise<ApiResponse<PaginatedResponse<any>>> {
    const queryParams = this.buildQueryParams({ page, size });
    return this.get<PaginatedResponse<any>>(
      `${API_ENDPOINTS.VETS.REVIEWS(id)}${queryParams}`
    );
  }

  // Additional vet-specific methods
  async getVetsByRating(
    minRating: number = 4.0,
    page: number = 0,
    size: number = 20
  ): Promise<ApiResponse<PaginatedResponse<VetDto>>> {
    const queryParams = this.buildQueryParams({ minRating, page, size });
    return this.get<PaginatedResponse<VetDto>>(
      `${this.baseEndpoint}/by-rating${queryParams}`
    );
  }

  async getVetSpecializations(): Promise<ApiResponse<string[]>> {
    return this.get<string[]>(`${this.baseEndpoint}/specializations`);
  }

  async updateVetSchedule(
    id: string,
    schedule: Array<{
      dayOfWeek: string;
      startTime: string;
      endTime: string;
    }>
  ): Promise<ApiResponse<VetDto>> {
    return this.patch<VetDto>(
      `${this.baseEndpoint}/${id}/schedule`,
      { availableHours: schedule }
    );
  }

  async getVetSchedule(id: string): Promise<ApiResponse<any>> {
    return this.get<any>(`${this.baseEndpoint}/${id}/schedule`);
  }

  async addVetReview(
    vetId: string,
    review: {
      rating: number;
      comment: string;
      consultationId?: string;
    }
  ): Promise<ApiResponse<any>> {
    return this.post<any>(
      `${this.baseEndpoint}/${vetId}/reviews`,
      review
    );
  }

  async updateVetProfile(
    id: string,
    profileData: {
      bio?: string;
      education?: string[];
      certifications?: string[];
      languages?: string[];
    }
  ): Promise<ApiResponse<VetDto>> {
    return this.patch<VetDto>(
      `${this.baseEndpoint}/${id}/profile`,
      profileData
    );
  }

  async getVetStats(id: string): Promise<ApiResponse<{
    totalConsultations: number;
    completedConsultations: number;
    averageRating: number;
    totalReviews: number;
    patientsHelped: number;
  }>> {
    return this.get<any>(`${this.baseEndpoint}/${id}/stats`);
  }

  async getOnlineVets(
    page: number = 0,
    size: number = 20
  ): Promise<ApiResponse<PaginatedResponse<VetDto>>> {
    const queryParams = this.buildQueryParams({ page, size });
    return this.get<PaginatedResponse<VetDto>>(
      `${this.baseEndpoint}/online${queryParams}`
    );
  }

  async getNearbyVets(
    latitude: number,
    longitude: number,
    radius: number = 10,
    page: number = 0,
    size: number = 20
  ): Promise<ApiResponse<PaginatedResponse<VetDto>>> {
    const queryParams = this.buildQueryParams({
      latitude,
      longitude,
      radius,
      page,
      size
    });
    return this.get<PaginatedResponse<VetDto>>(
      `${this.baseEndpoint}/nearby${queryParams}`
    );
  }

  async uploadVetCertification(
    id: string,
    file: File
  ): Promise<ApiResponse<FileUploadResponse>> {
    return this.uploadFile(
      `${this.baseEndpoint}/${id}/certifications`,
      file
    );
  }

  async deleteVetCertification(
    id: string,
    certificationId: string
  ): Promise<ApiResponse<void>> {
    return this.deleteEndpoint<void>(
      `${this.baseEndpoint}/${id}/certifications/${certificationId}`
    );
  }
} 