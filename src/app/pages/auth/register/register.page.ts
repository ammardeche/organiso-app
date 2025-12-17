import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/layouts/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { IRegisterRequest } from 'src/app/interfaces/IRegisterRequest';
import { passwordMatchValidator } from 'src/app/helpers/password-match-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
})
export class RegisterPage implements OnInit {
  isFormSubmitted = false;
  isLoading: boolean = false;
  backendErrorMessage = '';

  isScreenShared: boolean = false;

  checkUserScreen() {
    this.isScreenShared = false;
  }

  authService = inject(AuthService);
  router = inject(Router);

  private readonly fb = inject(FormBuilder);

  readonly form: FormGroup = this.fb.group(
    {
      fullname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      rememberMe: [false],
    },
    { validators: passwordMatchValidator() }
  );

  // password visibility
  passwordVisibility: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };

  constructor() {}

  ngOnInit() {}

  // Helper method to check field validity
  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!field && field.invalid && (field.touched || this.isFormSubmitted);
  }

  togglePassword(field: string) {
    this.passwordVisibility[field] = !this.passwordVisibility[field];
  }

  submit() {
    this.isFormSubmitted = true;

    // Mark all fields as touched to trigger validation display
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.isLoading = true;

    // Prepare registration data
    const registrationData: IRegisterRequest = {
      fullName: this.form.get('fullname')?.value,
      password: this.form.get('password')?.value,
      confirmPassword: this.form.get('confirmPassword')?.value,
      email: this.form.get('email')?.value,
    };

    // Call auth service (assuming register returns an observable)
    this.authService.register(registrationData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Registration successful', response);
        // Navigate to login or dashboard based on your flow
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;

        if (error.status === 409) {
          this.form.get('email')?.setErrors({ emailExists: true });
          this.backendErrorMessage =
            error.error?.message || 'Email already exists';
        } else if (error.status === 400) {
          this.backendErrorMessage = error.error?.message || 'Bad request';
        } else {
          this.backendErrorMessage = 'An unexpected error occurred';
        }
      },
    });
  }

  // Getter for easy access to form fields in template
  get f() {
    return this.form.controls;
  }
}
