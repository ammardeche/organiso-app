import { Component, OnInit } from '@angular/core';
import { TaskListPage } from 'src/app/pages/tasks/components/task-list/task-list.page';

@Component({
  selector: 'app-all-tasks-component',
  templateUrl: './all-tasks-component.component.html',
  styleUrls: ['./all-tasks-component.component.scss'],
  imports: [TaskListPage],
})
export class AllTasksComponentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
