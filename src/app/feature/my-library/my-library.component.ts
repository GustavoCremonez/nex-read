import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserLibraryService } from '../../core/services';
import { UserLibrary, ReadingStatus, ReadingStatusLabels } from '../../core/models';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyState } from '../../shared/components/empty-state/empty-state.component';
import { BookCard } from '../../shared/components/book-card/book-card.component';
import { ReadingStatusSelector } from '../../shared/components/reading-status-selector/reading-status-selector.component';

/**
 * Página de biblioteca do usuário
 *
 * Mostra livros organizados por status de leitura com tabs
 */
@Component({
  selector: 'app-my-library',
  imports: [LoadingSpinner, EmptyState, BookCard, ReadingStatusSelector],
  templateUrl: './my-library.component.html',
})
export class MyLibrary implements OnInit {
  private readonly userLibraryService = inject(UserLibraryService);
  private readonly router = inject(Router);

  /** Biblioteca completa do usuário */
  library = signal<UserLibrary[]>([]);

  /** Estado de loading */
  isLoading = signal(true);

  /** Status de filtro ativo */
  activeTab = signal<ReadingStatus | 'all'>('all');

  /** Enum disponível no template */
  ReadingStatus = ReadingStatus;

  /** Labels disponíveis no template */
  ReadingStatusLabels = ReadingStatusLabels;

  /** Tabs disponíveis */
  tabs = [
    { id: 'all' as const, label: 'Todos' },
    { id: ReadingStatus.WantToRead, label: ReadingStatusLabels[ReadingStatus.WantToRead] },
    { id: ReadingStatus.Reading, label: ReadingStatusLabels[ReadingStatus.Reading] },
    { id: ReadingStatus.Read, label: ReadingStatusLabels[ReadingStatus.Read] },
  ];

  ngOnInit(): void {
    this.loadLibrary();
  }

  /**
   * Carrega biblioteca do usuário
   */
  private loadLibrary(): void {
    this.isLoading.set(true);

    this.userLibraryService.getAll().subscribe({
      next: (library: UserLibrary[]) => {
        this.library.set(library);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        console.error('Erro ao carregar biblioteca:', error);
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Retorna livros filtrados pelo tab ativo
   */
  get filteredLibrary(): UserLibrary[] {
    const activeTab = this.activeTab();

    if (activeTab === 'all') {
      return this.library();
    }

    return this.library().filter((item) => item.status === activeTab);
  }

  /**
   * Verifica se um tab está ativo
   */
  isTabActive(tabId: ReadingStatus | 'all'): boolean {
    return this.activeTab() === tabId;
  }

  /**
   * Retorna classes CSS para um tab
   */
  getTabClasses(tabId: ReadingStatus | 'all'): string {
    const baseClasses = 'px-6 py-3 font-medium transition-colors border-b-2';

    if (this.isTabActive(tabId)) {
      return `${baseClasses} border-primary-600 text-primary-600`;
    }

    return `${baseClasses} border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300`;
  }

  /**
   * Retorna contador de livros para um tab
   */
  getTabCount(tabId: ReadingStatus | 'all'): number {
    if (tabId === 'all') {
      return this.library().length;
    }

    return this.library().filter((item) => item.status === tabId).length;
  }

  /**
   * Altera tab ativo
   */
  setActiveTab(tabId: ReadingStatus | 'all'): void {
    this.activeTab.set(tabId);
  }

  /**
   * Manipula mudança de status de leitura
   */
  onStatusChange(libraryItemId: number, newStatus: ReadingStatus): void {
    this.userLibraryService.updateBookStatus(libraryItemId, { status: newStatus }).subscribe({
      next: () => {
        // Atualiza o item local
        const library = this.library();
        const itemIndex = library.findIndex((item) => item.id === libraryItemId);

        if (itemIndex !== -1) {
          const updatedLibrary = [...library];
          updatedLibrary[itemIndex] = {
            ...updatedLibrary[itemIndex],
            status: newStatus,
          };
          this.library.set(updatedLibrary);
        }
      },
      error: (error: Error) => {
        console.error('Erro ao atualizar status:', error);
      },
    });
  }

  /**
   * Remove livro da biblioteca
   */
  onRemoveBook(bookId: number): void {
    this.userLibraryService.removeBook(bookId).subscribe({
      next: () => {
        // Remove o item local
        const library = this.library();
        const updatedLibrary = library.filter((item) => item.book.id !== bookId);
        this.library.set(updatedLibrary);
      },
      error: (error: Error) => {
        console.error('Erro ao remover livro:', error);
      },
    });
  }

  /**
   * Navega para detalhes do livro
   */
  navigateToBook(bookId: number): void {
    this.router.navigate(['/catalog', bookId]);
  }
}
