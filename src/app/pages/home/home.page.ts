import { Component, OnInit } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { TotalTasksComponentComponent } from './components/total-tasks-component/total-tasks-component.component';

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
  ],
})
export class HomePage implements OnInit {
  progress = 20;

  constructor() {}

  ngOnInit() {}
}
