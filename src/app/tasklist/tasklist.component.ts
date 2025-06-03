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
      error: (err) => {
        console.error('Failed to fetch tasks:', err);
      }
    });
  }

  onDelete(id: number | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id); // Update list
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        }
      });
    }
  }

  // onEdit(task: Task): void {
  //   this.router.navigate(['/edit-task', task.id]);
  // }
}
