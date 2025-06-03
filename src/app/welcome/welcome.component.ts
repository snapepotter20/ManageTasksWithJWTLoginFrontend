import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,QRCodeComponent],
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  username = '';
   quote: string = 'Loading...';
  author: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername() || 'User';
    this.fetchRandomQuote();
  }

    fetchRandomQuote(): void {
    const randomIndex = Math.floor(Math.random() * 100); // since total = 100
    fetch(`https://dummyjson.com/quotes?skip=${randomIndex}&limit=1`)
      .then(res => res.json())
      .then(data => {
        const randomQuote = data.quotes[0];
        this.quote = randomQuote.quote;
        this.author = randomQuote.author;
      })
      .catch(err => {
        console.error('Failed to fetch quote:', err);
        this.quote = 'Error fetching quote!';
        this.author = '';
      });
  }
}
