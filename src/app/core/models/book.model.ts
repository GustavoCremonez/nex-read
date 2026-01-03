import { Author } from './author.model';
import { Genre } from './genre.model';

/**
 * Modelo de Livro
 *
 * Corresponde à resposta BookResponse do back-end
 */
export interface Book {
  id: number;
  title: string;
  description?: string;
  isbn?: string;
  imageUrl?: string;
  publishedDate?: string;
  pageCount?: number;
  language?: string;
  averageRating?: number;
  authors: Author[];
  genres: Genre[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Request para criar livro
 */
export interface CreateBookRequest {
  title: string;
  description?: string;
  isbn?: string;
  imageUrl?: string;
  publishedDate?: string;
  pageCount?: number;
  language?: string;
  averageRating?: number;
  authorIds: number[];
  genreIds: number[];
}

/**
 * Request para atualizar livro
 */
export interface UpdateBookRequest {
  id: number;
  title: string;
  description?: string;
  isbn?: string;
  imageUrl?: string;
  publishedDate?: string;
  pageCount?: number;
  language?: string;
  averageRating?: number;
  authorIds: number[];
  genreIds: number[];
}
