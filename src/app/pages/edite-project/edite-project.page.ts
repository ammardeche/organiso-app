import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ProjectFormComponent } from 'src/app/components/layouts/project-form/project-form.component';
import { HeaderComponent } from 'src/app/components/layouts/header/header.component';

@Component({
  selector: 'app-edite-project',
  templateUrl: './edite-project.page.html',
  styleUrls: ['./edite-project.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,

    CommonModule,
    FormsModule,
    ProjectFormComponent,
    HeaderComponent,
  ],
})
export class EditeProjectPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
