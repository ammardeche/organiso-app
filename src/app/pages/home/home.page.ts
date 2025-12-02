import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';

import { TotalTasksComponentComponent } from './components/total-tasks-component/total-tasks-component.component';
import { InProgressComponentComponent } from './components/in-progress-component/in-progress-component.component';
import { IonicSlides } from '@ionic/angular';

import { SwiperOptions } from 'swiper/types';
import { TaskGroupComponentsComponent } from './components/task-group-components/task-group-components.component';

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
    TaskGroupComponentsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  progress = 20;
  items = Array(10);

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
