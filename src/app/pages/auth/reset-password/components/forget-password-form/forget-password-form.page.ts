import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
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

@Component({
  selector: 'app-forget-password-form',
  templateUrl: './forget-password-form.page.html',
  styleUrls: ['./forget-password-form.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class ForgetPasswordFormPage implements OnInit {
  isFormSubmitted = false;

  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    code_validation: ['', [Validators.required]],
    new_password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
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

  ngOnInit() {}
}
