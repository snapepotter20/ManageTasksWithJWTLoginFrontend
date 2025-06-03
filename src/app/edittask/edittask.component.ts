import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task, TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edittask',
    standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId!: number;
  title: string = '';
  description: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.taskId = +idParam; // Convert string to number
      this.loadTask();
    } else {
      this.error = 'Invalid task ID.';
    }
  }

  loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task: Task) => {
        this.title = task.title;
        this.description = task.description;
      },
      error: () => {
        this.error = 'Failed to load task.';
      }
    });
  }

  onSubmit(): void {
    const updatedTask: Task = {
      title: this.title,
      description: this.description
    };

    this.taskService.updateTask(this.taskId, updatedTask).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.error = 'Failed to update task.';
      }
    });
  }
}
