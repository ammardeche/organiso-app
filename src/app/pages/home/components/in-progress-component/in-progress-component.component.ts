import { Component, input, OnInit } from '@angular/core';
import { IonProgressBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-in-progress-component',
  templateUrl: './in-progress-component.component.html',
  styleUrls: ['./in-progress-component.component.scss'],
  imports: [IonProgressBar],
})
export class InProgressComponentComponent implements OnInit {
  progress = input<number>(20);
  title = input<string>('');
  constructor() {}

  ngOnInit() {}
}
