import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBookToLibraryRequest, ReadingStatus, UpdateBookStatusRequest, UserLibrary } from '../models';
import { HttpBaseService } from './http-base.service';

/**
 * Serviço de biblioteca do usuário
 *
 * Gerencia a biblioteca pessoal do usuário, incluindo adição,
 * remoção e atualização de status de leitura.
 */
@Injectable({
  providedIn: 'root',
})
export class UserLibraryService extends HttpBaseService {
  /**
   * Adiciona livro à biblioteca do usuário
   */
  addBook(request: AddBookToLibraryRequest): Observable<UserLibrary> {
    return this.post<UserLibrary>('/userlibrary', request);
  }

  /**
   * Atualiza status de leitura de um livro
   */
  updateBookStatus(bookId: number, request: UpdateBookStatusRequest): Observable<UserLibrary> {
    return this.put<UserLibrary>(`/userlibrary/${bookId}`, request);
  }

  /**
   * Remove livro da biblioteca
   */
  removeBook(bookId: number): Observable<void> {
    return this.delete<void>(`/userlibrary/${bookId}`);
  }

  /**
   * Busca todos os livros da biblioteca
   */
  getAll(): Observable<UserLibrary[]> {
    return this.get<UserLibrary[]>('/userlibrary');
  }

  /**
   * Busca livros por status de leitura
   */
  getByStatus(status: ReadingStatus): Observable<UserLibrary[]> {
    return this.get<UserLibrary[]>(`/userlibrary/status/${status}`);
  }
}
