import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Componente de barra de busca
 *
 * Input reutilizável com debounce para busca de livros
 */
@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
})
export class SearchBar {
  /** Valor do campo de busca */
  searchValue = signal('');

  /** Evento emitido quando o usuário busca */
  search = output<string>();

  /** Tempo de debounce em ms */
  private debounceTimer?: ReturnType<typeof setTimeout>;

  /**
   * Atualiza o valor da busca com debounce
   */
  onSearchChange(value: string): void {
    this.searchValue.set(value);

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.search.emit(value.trim());
    }, 300);
  }

  /**
   * Limpa o campo de busca
   */
  clearSearch(): void {
    this.searchValue.set('');
    this.search.emit('');
  }
}
