import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasklist',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }
}
