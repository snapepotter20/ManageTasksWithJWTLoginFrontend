import { Component } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addtask',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent {
  
   title = '';
  description = '';
  error = '';

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit() {
    if (!this.title || !this.description) {
      this.error = 'Please fill all fields';
      return;
    }

    const task: Task = { title: this.title, description: this.description };

    this.taskService.addTask(task).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => (this.error = 'Error adding task')
    });
  }
}
