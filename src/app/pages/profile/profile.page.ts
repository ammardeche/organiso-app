import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/layouts/header/header.component';
import { ProfileHeaderComponentComponent } from './components/profile-header-component/profile-header-component.component';
import { TaskStatisticsComponent } from './components/task-statistics/task-statistics.component';
import { ModalController, IonicModule } from '@ionic/angular';
import { UpdateInformationPage } from './pages/update-information/update-information.page';
import { UpdatePasswordPage } from './pages/update-password/update-password.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProfileHeaderComponentComponent,
    TaskStatisticsComponent,
    IonicModule,
    HeaderComponent,
  ],
})
export class ProfilePage implements OnInit {
  constructor() {}

  modalCtrl = inject(ModalController);

  async openUpdateUserInformationModal() {
    const modal = await this.modalCtrl.create({
      component: UpdateInformationPage,
      breakpoints: [0, 0.7, 1],
      initialBreakpoint: 0.7,
    });

    await modal.present();
  }

  async openUpdatePasswordModal() {
    const modal = await this.modalCtrl.create({
      component: UpdatePasswordPage,
      breakpoints: [0, 0.7, 1],
      initialBreakpoint: 0.7,
    });

    await modal.present();
  }

  ngOnInit() {}
}
