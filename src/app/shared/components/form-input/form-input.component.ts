import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

/**
 * Componente de input de formulário
 *
 * Input reutilizável com suporte a validação e estados de erro
 */
@Component({
  selector: 'app-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './form-input.component.html',
})
export class FormInput {
  /** Label do campo */
  label = input.required<string>();

  /** Tipo do input */
  type = input<string>('text');

  /** Placeholder */
  placeholder = input<string>('');

  /** FormControl associado */
  control = input.required<FormControl>();

  /** ID do campo */
  id = input.required<string>();

  /**
   * Verifica se o campo tem erro e foi tocado
   */
  get hasError(): boolean {
    const ctrl = this.control();
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  /**
   * Retorna mensagem de erro apropriada
   */
  get errorMessage(): string | null {
    const ctrl = this.control();
    if (!this.hasError) return null;

    if (ctrl.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (ctrl.hasError('email')) {
      return 'Email inválido';
    }
    if (ctrl.hasError('minlength')) {
      const minLength = ctrl.getError('minlength').requiredLength;
      return `Mínimo de ${minLength} caracteres`;
    }
    if (ctrl.hasError('maxlength')) {
      const maxLength = ctrl.getError('maxlength').requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }
    if (ctrl.hasError('pattern')) {
      return 'Formato inválido';
    }

    return 'Campo inválido';
  }
}
