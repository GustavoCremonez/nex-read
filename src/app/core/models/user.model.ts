/**
 * Modelo de Usuário
 *
 * Corresponde à resposta GetProfileResponse do back-end
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Request para registro de usuário
 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * Request para login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Resposta de login
 */
export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
}

/**
 * Request para refresh token
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Resposta de refresh token
 */
export interface RefreshTokenResponse {
  refreshToken: string;
}
