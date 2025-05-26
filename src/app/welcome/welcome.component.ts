import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  username = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername() || 'User';
  }
}
