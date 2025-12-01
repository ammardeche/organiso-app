import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-task-group-components',
  templateUrl: './task-group-components.component.html',
  styleUrls: ['./task-group-components.component.scss'],
})
export class TaskGroupComponentsComponent implements OnInit {
  progress = signal<number>(45);
  constructor() {}

  ngOnInit() {}
}
