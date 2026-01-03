import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models';
import { HttpBaseService } from './http-base.service';

/**
 * Serviço de livros
 *
 * Responsável por operações de leitura de livros.
 * Livros são read-only do ponto de vista do front-end.
 */
@Injectable({
  providedIn: 'root',
})
export class BookService extends HttpBaseService {
  /**
   * Busca livro por ID
   */
  getById(id: number): Observable<Book> {
    return this.get<Book>(`/books/${id}`);
  }

  /**
   * Busca livros por título
   */
  searchByTitle(title: string, limit: number = 20): Observable<Book[]> {
    return this.get<Book[]>('/books/search', { title, limit });
  }

  /**
   * Busca livros por gênero
   */
  getByGenre(genreId: number, limit: number = 20): Observable<Book[]> {
    return this.get<Book[]>(`/books/genre/${genreId}`, { limit });
  }
}
