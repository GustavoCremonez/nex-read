import { Component, input } from '@angular/core';

/**
 * Componente de estado vazio
 *
 * Exibe mensagem quando não há dados para mostrar
 */
@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.component.html',
})
export class EmptyState {
  /** Mensagem principal a ser exibida */
  message = input<string>('Nenhum resultado encontrado');

  /** Mensagem secundária opcional */
  description = input<string>();
}
