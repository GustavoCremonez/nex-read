import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Interface para item de breadcrumb
 */
export interface BreadcrumbItem {
  label: string;
  url?: string;
}

/**
 * Componente de navegação breadcrumb
 *
 * Exibe caminho de navegação hierárquico
 */
@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
})
export class Breadcrumb {
  /** Lista de itens do breadcrumb */
  items = input.required<BreadcrumbItem[]>();
}
