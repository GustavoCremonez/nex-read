import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard de autenticação
 *
 * Protege rotas que requerem autenticação.
 * Redireciona para login se usuário não estiver autenticado.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redireciona para login, preservando a URL de destino
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};
