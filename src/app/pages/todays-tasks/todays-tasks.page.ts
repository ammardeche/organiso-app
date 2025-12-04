import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/layouts/header/header.component';

@Component({
  selector: 'app-todays-tasks',
  templateUrl: './todays-tasks.page.html',
  styleUrls: ['./todays-tasks.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, HeaderComponent],
})
export class TodaysTasksPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
