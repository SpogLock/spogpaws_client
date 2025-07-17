// Clinic Repository Implementation
// Based on documented Spogpaws API structure
import {
  IClinicRepository,
  IHttpClient,
  ApiResponse,
  ClinicDto,
  CreateClinicRequest,
  UpdateClinicRequest,
} from '@/types';
import { BaseRepository } from './base.repository';
import { API_ENDPOINTS } from '@/lib/api-config';

export class ClinicRepository extends BaseRepository<ClinicDto, CreateClinicRequest, UpdateClinicRequest> implements IClinicRepository {
  constructor(httpClient: IHttpClient) {
    super(httpClient, ''); // No base endpoint needed for clinic APIs
  }

  async getAllClinics(): Promise<ApiResponse<ClinicDto[]>> {
    return this.get<ClinicDto[]>(API_ENDPOINTS.CLINIC.GET_ALL);
  }

  async getClinicById(clinicId: number): Promise<ApiResponse<ClinicDto>> {
    return this.get<ClinicDto>(API_ENDPOINTS.CLINIC.GET_BY_ID(clinicId));
  }

  async create(data: CreateClinicRequest): Promise<ApiResponse<ClinicDto>> {
    return this.post<ClinicDto>(API_ENDPOINTS.CLINIC.CREATE, data);
  }

  async update(id: string, data: UpdateClinicRequest): Promise<ApiResponse<ClinicDto>> {
    const clinicId = parseInt(id);
    return this.put<ClinicDto>(API_ENDPOINTS.CLINIC.UPDATE(clinicId), data);
  }

  async requestApproval(clinicId: number): Promise<ApiResponse<void>> {
    return this.post<void>(API_ENDPOINTS.CLINIC.REQUEST_APPROVAL(clinicId));
  }

  // Override base methods to work with clinic-specific endpoints
  async findById(id: string): Promise<ApiResponse<ClinicDto>> {
    const clinicId = parseInt(id);
    return this.getClinicById(clinicId);
  }

  async findAll(): Promise<ApiResponse<ClinicDto[]>> {
    return this.getAllClinics();
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    // Delete functionality not documented in API, so we'll throw an error
    throw new Error('Delete clinic functionality is not available in the current API');
  }
} 