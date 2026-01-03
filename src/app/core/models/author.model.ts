/**
 * Modelo de Autor
 *
 * Corresponde à entidade Author do back-end
 */
export interface Author {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Request para criar autor
 */
export interface CreateAuthorRequest {
  name: string;
}

/**
 * Request para atualizar autor
 */
export interface UpdateAuthorRequest {
  id: number;
  name: string;
}
