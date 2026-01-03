import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserLibraryService } from '../../../core/services';
import { ReadingStatus, UserLibrary } from '../../../core/models';
import { Button } from '../button/button.component';

/**
 * Botão para adicionar/remover livros da biblioteca do usuário
 *
 * Mostra diferentes estados baseado na autenticação e status da biblioteca
 */
@Component({
  selector: 'app-add-to-library-button',
  imports: [Button],
  templateUrl: './add-to-library-button.component.html',
})
export class AddToLibraryButton {
  private readonly authService = inject(AuthService);
  private readonly userLibraryService = inject(UserLibraryService);
  private readonly router = inject(Router);

  /** ID do livro */
  bookId = input.required<number>();

  /** Estado de loading */
  isLoading = signal(false);

  /** Estado se o livro está na biblioteca */
  isInLibrary = signal(false);

  /** Status de leitura atual */
  currentStatus = signal<ReadingStatus | null>(null);

  /** Usuário autenticado */
  isAuthenticated = this.authService.isAuthenticated;

  /** Texto do botão baseado no estado */
  buttonText = computed(() => {
    if (!this.isAuthenticated()) {
      return 'Adicionar à Biblioteca';
    }
    if (this.isInLibrary()) {
      return 'Remover da Biblioteca';
    }
    return 'Adicionar à Biblioteca';
  });

  /** Ícone do botão */
  buttonIcon = computed(() => {
    if (this.isInLibrary()) {
      return '✓';
    }
    return '+';
  });

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.checkLibraryStatus();
    }
  }

  /**
   * Verifica se o livro está na biblioteca do usuário
   */
  private checkLibraryStatus(): void {
    this.userLibraryService.getAll().subscribe({
      next: (library: UserLibrary[]) => {
        const libraryItem = library.find((item: UserLibrary) => item.book.id === this.bookId());
        if (libraryItem) {
          this.isInLibrary.set(true);
          this.currentStatus.set(libraryItem.status);
        }
      },
      error: (error: Error) => {
        console.error('Erro ao verificar biblioteca:', error);
      },
    });
  }

  /**
   * Manipula clique no botão
   */
  onButtonClick(): void {
    if (!this.isAuthenticated()) {
      // Redireciona para login com returnUrl
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }

    if (this.isInLibrary()) {
      this.removeFromLibrary();
    } else {
      this.addToLibrary();
    }
  }

  /**
   * Adiciona livro à biblioteca
   */
  private addToLibrary(): void {
    this.isLoading.set(true);

    this.userLibraryService
      .addBook({
        bookId: this.bookId(),
        status: ReadingStatus.WantToRead,
      })
      .subscribe({
        next: () => {
          this.isInLibrary.set(true);
          this.currentStatus.set(ReadingStatus.WantToRead);
          this.isLoading.set(false);
        },
        error: (error: Error) => {
          console.error('Erro ao adicionar à biblioteca:', error);
          this.isLoading.set(false);
        },
      });
  }

  /**
   * Remove livro da biblioteca
   */
  private removeFromLibrary(): void {
    this.isLoading.set(true);

    this.userLibraryService.removeBook(this.bookId()).subscribe({
      next: () => {
        this.isInLibrary.set(false);
        this.currentStatus.set(null);
        this.isLoading.set(false);
      },
      error: (error: Error) => {
        console.error('Erro ao remover da biblioteca:', error);
        this.isLoading.set(false);
      },
    });
  }
}
