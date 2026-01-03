import { Component, inject, OnInit, signal } from '@angular/core';
import { Book, Genre } from '../../core/models';
import { BookService, GenreService } from '../../core/services';
import { BookCard } from '../../shared/components/book-card/book-card.component';
import { EmptyState } from '../../shared/components/empty-state/empty-state.component';
import { GenreFilter } from '../../shared/components/genre-filter/genre-filter.component';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner.component';
import { SearchBar } from '../../shared/components/search-bar/search-bar.component';

/**
 * Página de catálogo de livros
 *
 * Permite buscar e filtrar livros por título e gênero
 */
@Component({
  selector: 'app-catalog',
  imports: [SearchBar, GenreFilter, BookCard, LoadingSpinner, EmptyState],
  templateUrl: './catalog.component.html',
})
export class Catalog implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly genreService = inject(GenreService);

  /** Lista de livros exibidos */
  books = signal<Book[]>([]);

  /** Lista de gêneros disponíveis */
  genres = signal<Genre[]>([]);

  /** Estado de carregamento */
  isLoading = signal(false);

  /** Termo de busca atual */
  searchTerm = signal('');

  /** Gênero selecionado */
  selectedGenreId = signal<number | null>(null);

  ngOnInit(): void {
    this.loadGenres();
    this.loadBooks();
  }

  /**
   * Carrega lista de gêneros
   */
  private loadGenres(): void {
    this.genreService.getAll().subscribe({
      next: (genres) => {
        this.genres.set(genres);
      },
      error: (error) => {
        console.error('Erro ao carregar gêneros:', error);
      },
    });
  }

  /**
   * Carrega livros baseado nos filtros atuais
   */
  private loadBooks(): void {
    this.isLoading.set(true);

    const genreId = this.selectedGenreId();
    const searchTerm = this.searchTerm();

    let observable;

    if (searchTerm) {
      // Busca por título
      observable = this.bookService.searchByTitle(searchTerm, 50);
    } else if (genreId) {
      // Filtra por gênero
      observable = this.bookService.getByGenre(genreId, 50);
    } else {
      // Se não há filtros, busca com termo vazio para pegar todos
      observable = this.bookService.searchByTitle('', 50);
    }

    observable.subscribe({
      next: (books) => {
        this.books.set(books);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar livros:', error);
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Handler para mudança na busca
   */
  onSearch(term: string): void {
    this.searchTerm.set(term);
    this.loadBooks();
  }

  /**
   * Handler para seleção de gênero
   */
  onGenreSelected(genreId: number | null): void {
    this.selectedGenreId.set(genreId);
    this.loadBooks();
  }
}
