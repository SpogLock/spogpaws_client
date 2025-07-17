// Adoption Repository Implementation
// Based on documented Spogpaws API structure
import {
  IAdoptionRepository,
  IHttpClient,
  ApiResponse,
  AdoptionDto,
  CreateAdoptionRequest,
  UpdateAdoptionRequest,
} from '@/types';
import { BaseRepository } from './base.repository';
import { API_ENDPOINTS } from '@/lib/api-config';

export class AdoptionRepository extends BaseRepository<AdoptionDto, CreateAdoptionRequest, UpdateAdoptionRequest> implements IAdoptionRepository {
  constructor(httpClient: IHttpClient) {
    super(httpClient, ''); // No base endpoint needed for adoption APIs
  }

  async getAllAdoptions(): Promise<ApiResponse<AdoptionDto[]>> {
    return this.get<AdoptionDto[]>(API_ENDPOINTS.ADOPTION.GET_ALL);
  }

  async getAdoptionById(id: number): Promise<ApiResponse<AdoptionDto>> {
    return this.get<AdoptionDto>(API_ENDPOINTS.ADOPTION.GET_BY_ID(id));
  }

  async create(data: CreateAdoptionRequest): Promise<ApiResponse<AdoptionDto>> {
    return this.post<AdoptionDto>(API_ENDPOINTS.ADOPTION.CREATE, data);
  }

  async update(id: string, data: UpdateAdoptionRequest): Promise<ApiResponse<AdoptionDto>> {
    const adoptionId = parseInt(id);
    return this.put<AdoptionDto>(API_ENDPOINTS.ADOPTION.UPDATE(adoptionId), data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    const adoptionId = parseInt(id);
    return this.deleteEndpoint<void>(API_ENDPOINTS.ADOPTION.DELETE(adoptionId));
  }

  // Override base methods to work with adoption-specific endpoints
  async findById(id: string): Promise<ApiResponse<AdoptionDto>> {
    const adoptionId = parseInt(id);
    return this.getAdoptionById(adoptionId);
  }

  async findAll(): Promise<ApiResponse<AdoptionDto[]>> {
    return this.getAllAdoptions();
  }
} 