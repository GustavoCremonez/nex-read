import { Book } from './book.model';
import { ReadingStatus } from './enums/reading-status.enum';

/**
 * Modelo de entrada da biblioteca do usuário
 *
 * Corresponde à resposta UserLibraryResponse do back-end
 */
export interface UserLibrary {
  id: number;
  userId: string;
  bookId: number;
  status: ReadingStatus;
  addedAt: string;
  updatedAt: string;
  book: Book;
}

/**
 * Request para adicionar livro à biblioteca
 */
export interface AddBookToLibraryRequest {
  bookId: number;
  status: ReadingStatus;
}

/**
 * Request para atualizar status de leitura
 */
export interface UpdateBookStatusRequest {
  status: ReadingStatus;
}
