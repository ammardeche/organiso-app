import { Component, OnInit } from '@angular/core';
import { TaskListPage } from 'src/app/pages/tasks/components/task-list/task-list.page';

@Component({
  selector: 'app-completed-tasks-component',
  templateUrl: './completed-tasks-component.component.html',
  styleUrls: ['./completed-tasks-component.component.scss'],
  imports: [TaskListPage],
})
export class CompletedTasksComponentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
