import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, DragDropModule],
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  tasks: Task[] = [];
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
        this.splitTasksByStatus();
      },
      error: (err) => {
        console.error('Failed to fetch tasks:', err);
      }
    });
  }

  splitTasksByStatus(): void {
    this.pendingTasks = this.tasks.filter(task => task.status === 'PENDING');
    this.inProgressTasks = this.tasks.filter(task => task.status === 'IN_PROGRESS');
    this.completedTasks = this.tasks.filter(task => task.status === 'COMPLETED');
  }

  onDelete(id: number | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
          this.splitTasksByStatus();
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        }
      });
    }
  }

  onEdit(task: Task): void {
    this.router.navigate(['/edit-task', task.id]);
  }

  drop(event: CdkDragDrop<Task[]>, targetStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'): void {
    if (event.previousContainer === event.container) {
      return;
    }

    const task = event.previousContainer.data[event.previousIndex];

    // Update local UI immediately
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // Update status and sync to backend
    const updatedTask = { ...task, status: targetStatus };

    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        // Success – no further action needed as UI is already updated
      },
      error: (err) => {
        console.error('Failed to update task status:', err);
        // Revert UI change if needed (optional)
      }
    });
  }
}
