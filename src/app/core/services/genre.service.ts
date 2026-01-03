import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../models';
import { HttpBaseService } from './http-base.service';

/**
 * Serviço de gêneros
 *
 * Responsável por operações de leitura de gêneros.
 * Gêneros são read-only do ponto de vista do front-end.
 */
@Injectable({
  providedIn: 'root',
})
export class GenreService extends HttpBaseService {
  /**
   * Busca todos os gêneros
   */
  getAll(): Observable<Genre[]> {
    return this.get<Genre[]>('/genres');
  }

  /**
   * Busca gênero por ID
   */
  getById(id: number): Observable<Genre> {
    return this.get<Genre>(`/genres/${id}`);
  }
}
