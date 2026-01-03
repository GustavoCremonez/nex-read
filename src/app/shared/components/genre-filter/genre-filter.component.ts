import { Component, input, output, signal } from '@angular/core';
import { Genre } from '../../../core/models';

/**
 * Componente de filtro por gênero
 *
 * Permite selecionar gêneros para filtrar livros
 */
@Component({
  selector: 'app-genre-filter',
  imports: [],
  templateUrl: './genre-filter.component.html',
})
export class GenreFilter {
  /** Lista de gêneros disponíveis */
  genres = input.required<Genre[]>();

  /** Gênero atualmente selecionado */
  selectedGenreId = signal<number | null>(null);

  /** Evento emitido quando um gênero é selecionado */
  genreSelected = output<number | null>();

  /**
   * Seleciona um gênero
   */
  selectGenre(genreId: number | null): void {
    this.selectedGenreId.set(genreId);
    this.genreSelected.emit(genreId);
  }

  /**
   * Verifica se um gênero está selecionado
   */
  isSelected(genreId: number | null): boolean {
    return this.selectedGenreId() === genreId;
  }
}
