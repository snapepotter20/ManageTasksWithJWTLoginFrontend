import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ You're using standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule,CommonModule] // ✅ Add FormsModule here
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/welcome']),
      error: () => (this.error = true)
    });
  }
}
