import { Component } from '@angular/core';

/**
 * Componente de indicador de carregamento
 *
 * Exibe um spinner animado durante operações assíncronas
 */
@Component({
  selector: 'app-loading-spinner',
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styles: `
    .spinner {
      border: 3px solid #f3f4f6;
      border-top: 3px solid #6366F1;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
})
export class LoadingSpinner {}
