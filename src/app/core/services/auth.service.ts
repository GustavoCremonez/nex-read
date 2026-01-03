import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  User,
} from '../models';
import { HttpBaseService } from './http-base.service';

/**
 * Serviço de autenticação
 *
 * Gerencia login, registro, logout e estado de autenticação do usuário.
 * Utiliza cookies para autenticação (gerenciados pelo back-end).
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService {
  private readonly router = inject(Router);

  // Estado de autenticação usando Angular Signals
  private readonly currentUserSignal = signal<User | null>(null);
  private refreshToken: string | null = null;

  // Expõe estado como readonly
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = () => this.currentUserSignal() !== null;

  /**
   * Registra novo usuário
   */
  register(request: RegisterRequest): Observable<User> {
    return this.post<User>('/auth/register', request);
  }

  /**
   * Realiza login
   */
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.post<LoginResponse>('/auth/login', request).pipe(
      tap((response) => {
        this.setAuthData(response);
      })
    );
  }

  /**
   * Realiza logout
   */
  logout(): Observable<void> {
    return this.post<void>('/auth/logout', {}).pipe(
      tap(() => {
        this.clearAuthData();
        this.router.navigate(['/']);
      })
    );
  }

  /**
   * Renova token de autenticação
   */
  refreshAuthToken(): Observable<RefreshTokenResponse> {
    if (!this.refreshToken) {
      throw new Error('Refresh token não disponível');
    }

    const request: RefreshTokenRequest = {
      refreshToken: this.refreshToken,
    };

    return this.post<RefreshTokenResponse>('/auth/refresh-token', request).pipe(
      tap((response) => {
        this.refreshToken = response.refreshToken;
        this.saveRefreshToken(response.refreshToken);
      })
    );
  }

  /**
   * Carrega perfil do usuário autenticado
   */
  loadCurrentUser(): Observable<User> {
    return this.get<User>('/users/me').pipe(
      tap((user) => {
        this.currentUserSignal.set(user);
      })
    );
  }

  /**
   * Inicializa autenticação ao carregar aplicação
   * Verifica se existe refresh token armazenado
   */
  initializeAuth(): void {
    const storedToken = this.getStoredRefreshToken();
    if (storedToken) {
      this.refreshToken = storedToken;
      // Tenta carregar usuário atual
      this.loadCurrentUser().subscribe({
        error: () => {
          // Se falhar, limpa dados de autenticação
          this.clearAuthData();
        },
      });
    }
  }

  /**
   * Armazena dados de autenticação
   */
  private setAuthData(response: LoginResponse): void {
    const user: User = {
      id: response.id,
      name: response.name,
      email: response.email,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };

    this.currentUserSignal.set(user);
    this.refreshToken = response.refreshToken;
    this.saveRefreshToken(response.refreshToken);
  }

  /**
   * Limpa dados de autenticação
   */
  private clearAuthData(): void {
    this.currentUserSignal.set(null);
    this.refreshToken = null;
    this.removeRefreshToken();
  }

  /**
   * Salva refresh token no localStorage
   */
  private saveRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  /**
   * Recupera refresh token do localStorage
   */
  private getStoredRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  /**
   * Remove refresh token do localStorage
   */
  private removeRefreshToken(): void {
    localStorage.removeItem('refreshToken');
  }
}
