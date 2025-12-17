import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-statistics',
  templateUrl: './task-statistics.component.html',
  styleUrls: ['./task-statistics.component.scss'],
  imports: [NgClass],
})
export class TaskStatisticsComponent implements OnInit {
  selectedStatus: string = 'Completed'; // make Completed active by default

  statuses = [
    { name: 'Completed', count: 12 },
    { name: 'In Progress', count: 4 },
    { name: 'To Do', count: 6 },
  ];

  selectStatus(status: string) {
    this.selectedStatus = status;
    console.log('Selected: ', this.selectedStatus);
  }
  constructor() {}

  ngOnInit() {}
}
