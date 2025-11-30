import { Component, OnInit, signal, Signal } from '@angular/core';
import { single } from 'rxjs';

@Component({
  selector: 'app-total-tasks-component',
  templateUrl: './total-tasks-component.component.html',
  styleUrls: ['./total-tasks-component.component.scss'],
})
export class TotalTasksComponentComponent implements OnInit {
  progress = signal<number>(35);
  constructor() {}

  ngOnInit() {}
}
