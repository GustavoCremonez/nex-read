import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor de autenticação
 *
 * Garante que as credenciais (cookies) sejam enviadas em todas as requisições
 * para o back-end, permitindo autenticação baseada em cookies.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Adiciona withCredentials para enviar cookies automaticamente
  const authReq = req.clone({
    withCredentials: true,
  });

  return next(authReq);
};
