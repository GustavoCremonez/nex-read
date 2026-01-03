import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services';
import { Button } from '../../shared/components/button/button.component';
import { FormInput } from '../../shared/components/form-input/form-input.component';

/**
 * Página de login
 *
 * Permite usuários autenticarem-se no sistema
 */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormInput, Button, RouterLink],
  templateUrl: './login.component.html',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /** Estado de loading */
  isLoading = signal(false);

  /** Mensagem de erro */
  errorMessage = signal<string | null>(null);

  /** Formulário de login */
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  /**
   * Submete o formulário de login
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.loginForm.value;

    this.authService.login({ email: email!, password: password! }).subscribe({
      next: () => {
        // Redireciona para URL de retorno ou catálogo
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/catalog';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Email ou senha inválidos. Tente novamente.');
        console.error('Erro no login:', error);
      },
    });
  }

  /** Getter para FormControls */
  get emailControl() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }
}
