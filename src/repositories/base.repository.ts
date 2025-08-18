// Base Repository Implementation
// Updated for Spogpaws API structure
import { IBaseRepository, IHttpClient, ApiResponse } from '@/types';

export abstract class BaseRepository<T, TCreate, TUpdate> implements IBaseRepository<T, TCreate, TUpdate> {
  protected httpClient: IHttpClient;
  protected baseEndpoint: string;

  constructor(httpClient: IHttpClient, baseEndpoint: string) {
    this.httpClient = httpClient;
    this.baseEndpoint = baseEndpoint;
  }

  async findById(id: string): Promise<ApiResponse<T>> {
    return this.httpClient.get<ApiResponse<T>>(`${this.baseEndpoint}/${id}`);
  }

  async findAll(): Promise<ApiResponse<T[]>> {
    return this.httpClient.get<ApiResponse<T[]>>(this.baseEndpoint);
  }

  async create(data: TCreate): Promise<ApiResponse<T>> {
    return this.httpClient.post<ApiResponse<T>>(this.baseEndpoint, data);
  }

  async update(id: string, data: TUpdate): Promise<ApiResponse<T>> {
    return this.httpClient.put<ApiResponse<T>>(`${this.baseEndpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(`${this.baseEndpoint}/${id}`);
  }

  // Protected helper methods for derived classes
  protected async get<TResult>(endpoint: string): Promise<ApiResponse<TResult>> {
    return this.httpClient.get<ApiResponse<TResult>>(endpoint);
  }

  protected async post<TResult>(endpoint: string, data?: unknown): Promise<ApiResponse<TResult>> {
    return this.httpClient.post<ApiResponse<TResult>>(endpoint, data);
  }

  protected async put<TResult>(endpoint: string, data?: unknown): Promise<ApiResponse<TResult>> {
    return this.httpClient.put<ApiResponse<TResult>>(endpoint, data);
  }

  protected async patch<TResult>(endpoint: string, data?: unknown): Promise<ApiResponse<TResult>> {
    return this.httpClient.patch<ApiResponse<TResult>>(endpoint, data);
  }

  protected async deleteEndpoint<TResult>(endpoint: string): Promise<ApiResponse<TResult>> {
    return this.httpClient.delete<ApiResponse<TResult>>(endpoint);
  }

  // Helper method for building query parameters
  protected buildQueryParams(params: Record<string, unknown>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, item.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    return searchParams.toString() ? `?${searchParams.toString()}` : '';
  }

  // Helper method for handling file uploads
  protected async uploadFiles(endpoint: string, files: File[]): Promise<ApiResponse<unknown>> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    return this.httpClient.post<ApiResponse<unknown>>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Helper method for handling single file upload
  protected async uploadFile(endpoint: string, file: File): Promise<ApiResponse<unknown>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<ApiResponse<unknown>>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
} 