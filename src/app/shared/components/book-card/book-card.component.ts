import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../core/models';

/**
 * Componente de card de livro
 *
 * Exibe informações resumidas de um livro com link para detalhes
 */
@Component({
  selector: 'app-book-card',
  imports: [RouterLink],
  templateUrl: './book-card.component.html',
})
export class BookCard {
  /** Dados do livro a ser exibido */
  book = input.required<Book>();

  /**
   * Retorna URL da imagem ou placeholder
   */
  get bookImage(): string {
    return this.book().imageUrl || 'https://via.placeholder.com/200x300?text=Sem+Capa';
  }

  /**
   * Retorna lista de autores formatada
   */
  get authorsText(): string {
    const authors = this.book().authors;
    if (!authors || authors.length === 0) {
      return 'Autor desconhecido';
    }
    return authors.map((a) => a.name).join(', ');
  }

  /**
   * Retorna os primeiros 3 gêneros
   */
  get displayGenres() {
    return this.book().genres.slice(0, 3);
  }
}
