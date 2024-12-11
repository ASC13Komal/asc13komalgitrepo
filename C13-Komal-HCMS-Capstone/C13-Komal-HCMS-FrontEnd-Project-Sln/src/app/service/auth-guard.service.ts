import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {}

  isAuthenticated(): boolean{
    return !!localStorage.getItem('admin');
  }

  canActivate(): boolean {
    if (this.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
      return true;
    }
    logout(): void{
      localStorage.removeItem('admin');
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
  }