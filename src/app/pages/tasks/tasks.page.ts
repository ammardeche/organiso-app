import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperOptions } from 'swiper/types';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonContent } from '@ionic/angular/standalone';
import { Swiper } from 'swiper/types';
import { register } from 'swiper/element';
import { HeaderComponent } from 'src/app/components/layouts/header/header.component';
import { RouterLink } from '@angular/router';
import { SearchBarPage } from './components/search-bar/search-bar.page';
import { TaskListPage } from './components/task-list/task-list.page';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    SearchBarPage,
    TaskListPage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TasksPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
