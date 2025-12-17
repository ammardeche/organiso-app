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
import { ProfileHeaderComponentComponent } from '../../components/profile-header-component/profile-header-component.component';
import { HeaderComponent } from 'src/app/components/layouts/header/header.component';
import { ModalController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonContent],
})
export class UpdatePasswordPage implements OnInit {
  isFormSubmitted = false;

  modalCtrl = inject(ModalController);

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

  submit() {
    if (this.form.invalid) return;
    if (this.form.value.new_password !== this.form.value.confirm_password) {
      alert('Passwords do not match');
      return;
    }
    this.modalCtrl.dismiss({ updated: true });
  }

  close() {
    this.modalCtrl.dismiss();
  }
  constructor() {}

  ngOnInit() {}
}
