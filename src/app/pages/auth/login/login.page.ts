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
  IonApp,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/layouts/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    HeaderComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  // life cycle hooks
  ngOnInit() {}
  // constructor
  constructor() {}
  // variables
  authService = inject(AuthService);
  router = inject(Router);
  isFormSubmitted = false;
  rememberMe: boolean = true;
  isLoading = false;
  // form
  private readonly fb = inject(FormBuilder);
  readonly form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false], // 👈 added checkbox control
  });

  // password visibility
  passwordVisibility: boolean = false;
  togglePassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  submit() {
    this.isFormSubmitted = true;

    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    const { email, password, rememberMe } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.isLoading = false;

        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
      },
    });

    console.log(this.form.value);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!field && field.invalid && (field.touched || this.isFormSubmitted);
  }
}
