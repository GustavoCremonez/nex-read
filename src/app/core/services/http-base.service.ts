import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Serviço base para requisições HTTP
 *
 * Fornece métodos utilitários para comunicação com a API,
 * centralizando a URL base e padrões comuns.
 */
export abstract class HttpBaseService {
  protected readonly http = inject(HttpClient);
  protected readonly apiUrl = environment.apiUrl;

  /**
   * Constrói URL completa da API
   */
  protected buildUrl(endpoint: string): string {
    return `${this.apiUrl}${endpoint}`;
  }

  /**
   * GET request
   */
  protected get<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(this.buildUrl(endpoint), { params });
  }

  /**
   * POST request
   */
  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), body);
  }

  /**
   * PUT request
   */
  protected put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(this.buildUrl(endpoint), body);
  }

  /**
   * DELETE request
   */
  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.buildUrl(endpoint));
  }
}
