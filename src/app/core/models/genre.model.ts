/**
 * Modelo de Gênero
 *
 * Corresponde à entidade Genre do back-end
 */
export interface Genre {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Request para criar gênero
 */
export interface CreateGenreRequest {
  name: string;
}

/**
 * Request para atualizar gênero
 */
export interface UpdateGenreRequest {
  id: number;
  name: string;
}
