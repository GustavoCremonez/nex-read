import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';
import { HttpBaseService } from './http-base.service';

/**
 * Serviço de usuário
 *
 * Gerencia operações relacionadas ao perfil do usuário.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpBaseService {
  /**
   * Busca perfil do usuário autenticado
   */
  getMe(): Observable<User> {
    return this.get<User>('/users/me');
  }

  /**
   * Busca perfil de usuário por ID
   */
  getById(id: string): Observable<User> {
    return this.get<User>(`/users/${id}`);
  }
}
