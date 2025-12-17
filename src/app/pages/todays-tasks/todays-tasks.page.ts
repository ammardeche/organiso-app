import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/layouts/header/header.component';
import { WeeklyDaysComponentComponent } from './components/weekly-days-component/weekly-days-component.component';
import { register } from 'swiper/element/bundle';
import { AllTasksComponentComponent } from './components/all-tasks-component/all-tasks-component.component';
import { InProgressComponentComponent } from '../home/components/in-progress-component/in-progress-component.component';
import { InProgressTasksComponentComponent } from './components/in-progress-tasks-component/in-progress-tasks-component.component';
import { ToDoTasksComponentComponent } from './components/to-do-tasks-component/to-do-tasks-component.component';
import { CompletedTasksComponentComponent } from './components/completed-tasks-component/completed-tasks-component.component';

@Component({
  selector: 'app-todays-tasks',
  templateUrl: './todays-tasks.page.html',
  styleUrls: ['./todays-tasks.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    HeaderComponent,
    WeeklyDaysComponentComponent,
    AllTasksComponentComponent,
    InProgressTasksComponentComponent,
    ToDoTasksComponentComponent,
    CompletedTasksComponentComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TodaysTasksPage implements OnInit {
  currentStatus: string = 'All';
  constructor() {}

  buttons = ['All', 'To Do ', 'In Progress', 'Completed'];

  onStatusChange(value: string) {
    // Trim the value to avoid trailing spaces
    this.currentStatus = value.trim();
    console.log('btn value', this.currentStatus);
  }

  ngOnInit() {
    register();
  }
}
