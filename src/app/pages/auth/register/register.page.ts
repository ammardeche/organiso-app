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
import { RouterLink } from '@angular/router';

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
  rememberMe: boolean = true;

  private readonly fb = inject(FormBuilder);
  readonly form: FormGroup = this.fb.group({
    full_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
    rememberMe: [false], //  added checkbox control
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

  constructor() {}

  submit() {}
  ngOnInit() {}
}
