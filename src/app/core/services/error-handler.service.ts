import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Serviço centralizado de tratamento de erros
 *
 * Responsável por processar erros HTTP e exibir mensagens
 * apropriadas ao usuário.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  /**
   * Processa erros HTTP e exibe mensagem apropriada
   */
  handleError(error: HttpErrorResponse): void {
    let errorMessage = 'Ocorreu um erro inesperado';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 400:
          errorMessage = this.extractValidationErrors(error) || 'Dados inválidos';
          break;
        case 401:
          errorMessage = 'Não autorizado. Por favor, faça login novamente.';
          break;
        case 403:
          errorMessage = 'Você não tem permissão para acessar este recurso.';
          break;
        case 404:
          errorMessage = 'Recurso não encontrado.';
          break;
        case 409:
          errorMessage = error.error?.message || 'Conflito de dados.';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.error?.message || error.statusText}`;
      }
    }

    // TODO: Integrar com componente de notificação/toast quando disponível
    console.error('Erro HTTP:', errorMessage, error);
  }

  /**
   * Extrai mensagens de erro de validação do back-end
   */
  private extractValidationErrors(error: HttpErrorResponse): string | null {
    if (error.error?.errors) {
      const errors = Object.values(error.error.errors).flat() as string[];
      return errors.join(', ');
    }

    if (error.error?.message) {
      return error.error.message;
    }

    return null;
  }
}
