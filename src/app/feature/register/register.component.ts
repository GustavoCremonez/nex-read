import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services';
import { Button } from '../../shared/components/button/button.component';
import { FormInput } from '../../shared/components/form-input/form-input.component';

/**
 * Página de registro
 *
 * Permite novos usuários criarem uma conta
 */
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormInput, Button, RouterLink],
  templateUrl: './register.component.html',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  /** Estado de loading */
  isLoading = signal(false);

  /** Mensagem de erro */
  errorMessage = signal<string | null>(null);

  /** Formulário de registro */
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(40),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    ]),
  });

  /**
   * Submete o formulário de registro
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { name, email, password } = this.registerForm.value;

    this.authService.register({ name: name!, email: email!, password: password! }).subscribe({
      next: () => {
        // Após registro bem-sucedido, faz login automaticamente
        this.authService.login({ email: email!, password: password! }).subscribe({
          next: () => {
            this.router.navigate(['/catalog']);
          },
          error: () => {
            // Se login falhar, redireciona para página de login
            this.router.navigate(['/login']);
          },
        });
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Erro ao criar conta. Este email pode já estar cadastrado.');
        console.error('Erro no registro:', error);
      },
    });
  }

  /** Getters para FormControls */
  get nameControl() {
    return this.registerForm.get('name') as FormControl;
  }

  get emailControl() {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.registerForm.get('password') as FormControl;
  }
}
