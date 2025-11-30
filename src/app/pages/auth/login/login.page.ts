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
import { RouterLink } from '@angular/router';

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
  isFormSubmitted = false;
  rememberMe: boolean = true;

  private readonly fb = inject(FormBuilder);
  readonly form: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false], // 👈 added checkbox control
  });

  // password visibility
  passwordVisibility: { [key: string]: boolean } = {
    current_password: false,
    new_password: false,
    confirm_password: false,
  };

  togglePassword(field: string) {
    this.passwordVisibility[field] = !this.passwordVisibility[field];
  }

  submit() {}
  constructor() {}

  ngOnInit() {}
}
