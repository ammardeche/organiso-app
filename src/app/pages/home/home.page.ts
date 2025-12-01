import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';

import { RouterLink } from '@angular/router';
import { TotalTasksComponentComponent } from './components/total-tasks-component/total-tasks-component.component';
import { InProgressComponentComponent } from './components/in-progress-component/in-progress-component.component';
import { Swiper, SwiperModule } from 'swiper/types';
import { IonicSlides } from '@ionic/angular';

import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    TotalTasksComponentComponent,
    InProgressComponentComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  progress = 20;

  swiperModules = [IonicSlides];

  swiperConfig: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 8,
    freeMode: true,
    mousewheel: {
      forceToAxis: true,
    },
  };

  constructor() {}

  ngOnInit() {
    register();
  }
}
