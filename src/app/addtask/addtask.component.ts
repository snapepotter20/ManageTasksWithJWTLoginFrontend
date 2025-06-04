import { Component } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addtask',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent {

  title: string = '';
  description: string = '';
  status: string = ''; // Allow "" for form
  error: string = '';
  success: string = '';

  validStatuses: Array<'PENDING' | 'IN_PROGRESS' | 'COMPLETED'> = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid || !this.validStatuses.includes(this.status as any)) {
      this.error = 'Please fill all required fields and select a valid status';
      return;
    }

    const task: Task = {
      title: this.title.trim(),
      description: this.description.trim(),
      status: this.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
    };

    this.taskService.addTask(task).subscribe({
      next: () => {
        this.success = 'Task added successfully!';
        this.error = '';
        form.resetForm();
        setTimeout(() => this.router.navigate(['/tasks']), 1000);
      },
      error: () => {
        this.error = 'Error adding task';
        this.success = '';
      }
    });
  }
}
