import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task, TaskService } from '../services/task.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edittask',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId!: number;
  title: string = '';
  description: string = '';
  status: string = '';
  error: string = '';
  success: string = '';

  validStatuses: Array<'PENDING' | 'IN_PROGRESS' | 'COMPLETED'> = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.taskId = +idParam;
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
        this.status = task.status;
      },
      error: () => {
        this.error = 'Failed to load task.';
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (
      form.invalid ||
      !this.validStatuses.includes(this.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED')
    ) {
      this.error = 'Please fill all required fields with valid data.';
      this.success = '';
      return;
    }

    const updatedTask: Task = {
      id: this.taskId,
      title: this.title.trim(),
      description: this.description.trim(),
      status: this.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        this.success = 'Task updated successfully!';
        this.error = '';
        setTimeout(() => this.router.navigate(['/tasks']), 1000);
      },
      error: () => {
        this.error = 'Failed to update task.';
        this.success = '';
      }
    });
  }
}
