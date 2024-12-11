import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../service/auth-guard.service';

@Component({
  selector: 'app-dashboard',
  // standalone: true,
  // imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  constructor(private authService: AuthGuard, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
