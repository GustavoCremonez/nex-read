import { Component, computed, input } from '@angular/core';

/**
 * Componente de botão
 *
 * Botão reutilizável com variantes e estados
 */
@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
})
export class Button {
  /** Tipo do botão */
  type = input<'button' | 'submit'>('button');

  /** Variante visual */
  variant = input<'primary' | 'secondary' | 'ghost'>('primary');

  /** Estado de loading */
  loading = input<boolean>(false);

  /** Desabilitado */
  disabled = input<boolean>(false);

  /** Classes CSS do botão */
  buttonClasses = computed(() => {
    const base = 'btn';
    const variants = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'hover:bg-gray-100 text-gray-700',
    };

    const disabledClass = this.disabled() || this.loading() ? 'opacity-50 cursor-not-allowed' : '';

    return `${base} ${variants[this.variant()]} ${disabledClass}`.trim();
  });
}
