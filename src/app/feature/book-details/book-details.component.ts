import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../core/models';
import { BookService } from '../../core/services';
import { Breadcrumb, BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';
import { EmptyState } from '../../shared/components/empty-state/empty-state.component';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner.component';
import { RatingDisplay } from '../../shared/components/rating-display/rating-display.component';
import { AddToLibraryButton } from '../../shared/components/add-to-library-button/add-to-library-button.component';

/**
 * Página de detalhes do livro
 *
 * Exibe informações completas de um livro específico
 */
@Component({
  selector: 'app-book-details',
  imports: [Breadcrumb, RatingDisplay, LoadingSpinner, EmptyState, AddToLibraryButton],
  templateUrl: './book-details.component.html',
})
export class BookDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bookService = inject(BookService);

  /** Dados do livro */
  book = signal<Book | null>(null);

  /** Estado de carregamento */
  isLoading = signal(true);

  /** Indica se houve erro */
  hasError = signal(false);

  /** Itens do breadcrumb */
  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Catálogo', url: '/catalog' },
    { label: 'Carregando...' },
  ]);

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');

    if (!bookId) {
      this.hasError.set(true);
      this.isLoading.set(false);
      return;
    }

    this.loadBook(+bookId);
  }

  /**
   * Carrega dados do livro
   */
  private loadBook(id: number): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.bookService.getById(id).subscribe({
      next: (book) => {
        this.book.set(book);
        this.updateBreadcrumb(book.title);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar livro:', error);
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Atualiza breadcrumb com título do livro
   */
  private updateBreadcrumb(title: string): void {
    this.breadcrumbItems.set([
      { label: 'Catálogo', url: '/catalog' },
      { label: title },
    ]);
  }

  /**
   * Retorna URL da imagem ou placeholder
   */
  get bookImage(): string {
    return this.book()?.imageUrl || 'https://via.placeholder.com/400x600?text=Sem+Capa';
  }

  /**
   * Retorna lista de autores formatada
   */
  get authorsText(): string {
    const authors = this.book()?.authors;
    if (!authors || authors.length === 0) {
      return 'Autor desconhecido';
    }
    return authors.map((a) => a.name).join(', ');
  }

  /**
   * Formata data de publicação
   */
  get formattedPublishedDate(): string | null {
    const date = this.book()?.publishedDate;
    if (!date) return null;

    try {
      return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return null;
    }
  }
}
