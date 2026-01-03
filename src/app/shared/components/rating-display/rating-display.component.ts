import { Component, computed, input } from '@angular/core';

/**
 * Componente de exibição de rating
 *
 * Exibe avaliação em formato de estrelas
 */
@Component({
  selector: 'app-rating-display',
  imports: [],
  templateUrl: './rating-display.component.html',
})
export class RatingDisplay {
  /** Valor do rating (0-5) */
  rating = input<number>(0);

  /** Tamanho das estrelas (sm, md, lg) */
  size = input<'sm' | 'md' | 'lg'>('md');

  /** Exibir valor numérico ao lado */
  showValue = input<boolean>(true);

  /** Array de 5 elementos para iterar */
  stars = [1, 2, 3, 4, 5];

  /** Classes CSS baseadas no tamanho */
  starClasses = computed(() => {
    const sizeMap = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };
    return sizeMap[this.size()];
  });

  /**
   * Verifica se uma estrela deve ser preenchida
   */
  isStarFilled(index: number): boolean {
    return this.rating() >= index;
  }

  /**
   * Verifica se uma estrela deve ser parcialmente preenchida
   */
  isStarHalf(index: number): boolean {
    const ratingValue = this.rating();
    return ratingValue >= index - 0.5 && ratingValue < index;
  }
}
