import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { HttpBaseService } from './http-base.service';

/**
 * Serviço de recomendações
 *
 * Busca recomendações personalizadas de livros baseadas
 * no perfil e biblioteca do usuário.
 */
@Injectable({
  providedIn: 'root',
})
export class RecommendationsService extends HttpBaseService {
  /**
   * Busca recomendações personalizadas
   *
   * @param limit Número máximo de recomendações (padrão: 10)
   */
  getRecommendations(limit: number = 10): Observable<Book[]> {
    return this.get<Book[]>('/recommendations', { limit });
  }
}
