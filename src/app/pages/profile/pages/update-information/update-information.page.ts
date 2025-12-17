import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ModalController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.page.html',
  styleUrls: ['./update-information.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent , ReactiveFormsModule],
})
export class UpdateInformationPage implements OnInit {
  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {}

  submit() {
    if (this.form.invalid) return;
    this.modalCtrl.dismiss({ updated: true, ...this.form.value });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  ngOnInit(): void {}
}
