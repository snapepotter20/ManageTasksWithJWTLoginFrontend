import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8091/api/tasks';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/getalltasks`, {
      headers: this.getAuthHeaders()
    });
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/addtask`, task, {
      headers: this.getAuthHeaders()
    });
  }
}
