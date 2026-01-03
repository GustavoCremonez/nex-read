import { Component, input, output } from '@angular/core';
import { ReadingStatus, ReadingStatusLabels } from '../../../core/models';

/**
 * Seletor de status de leitura
 *
 * Permite ao usuário alterar o status de um livro em sua biblioteca
 */
@Component({
  selector: 'app-reading-status-selector',
  imports: [],
  templateUrl: './reading-status-selector.component.html',
})
export class ReadingStatusSelector {
  /** Status atual */
  currentStatus = input.required<ReadingStatus>();

  /** Evento emitido quando o status muda */
  statusChange = output<ReadingStatus>();

  /** Enum disponível no template */
  ReadingStatus = ReadingStatus;

  /** Labels disponíveis no template */
  ReadingStatusLabels = ReadingStatusLabels;

  /** Lista de status disponíveis */
  statuses = [
    ReadingStatus.WantToRead,
    ReadingStatus.Reading,
    ReadingStatus.Read,
  ];

  /**
   * Manipula mudança de status
   */
  onStatusChange(status: ReadingStatus): void {
    if (status !== this.currentStatus()) {
      this.statusChange.emit(status);
    }
  }

  /**
   * Verifica se um status está ativo
   */
  isActive(status: ReadingStatus): boolean {
    return status === this.currentStatus();
  }

  /**
   * Retorna classes CSS para um botão de status
   */
  getStatusClasses(status: ReadingStatus): string {
    const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';

    if (this.isActive(status)) {
      return `${baseClasses} bg-primary-600 text-white`;
    }

    return `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  }
}
