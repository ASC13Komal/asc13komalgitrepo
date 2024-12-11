import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  invalidAttempts = 0;
  isAccountLocked = false;
  lockRemainingTime: number | null = null;
  errorMessage: string = '';
  showPassword = false;  // Variable to control password visibility

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}')
        ]
      ]
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) return 'Email cannot be blank.';
    if (this.email.hasError('email')) return 'Enter a valid email address.';
    return '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) return 'Password cannot be blank.';
    if (this.password.hasError('minlength')) return 'Password must be at least 8 characters.';
    if (this.password.hasError('pattern'))
      return 'Password must contain uppercase, lowercase, digit, and special character.';
    return '';
  }

  onLogin() {
    const validEmail = 'pavi@gmail.com';
    const validPassword = 'Test@1234';

    const { email, password } = this.loginForm.value;

    if (email === validEmail && password === validPassword) {
      // alert('Login successful!'); 
      this.router.navigate(['/dashboard']);
    } else {
      this.invalidAttempts++;
      this.errorMessage = 'Invalid email or password.';

      if (this.invalidAttempts >= 3) {
        this.lockAccount();
      }
    }
  }

  lockAccount() {
    this.isAccountLocked = true;
    this.lockRemainingTime = 30;

    const interval = setInterval(() => {
      if (this.lockRemainingTime !== null) this.lockRemainingTime--;

      if (this.lockRemainingTime === 0) {
        clearInterval(interval);
        this.isAccountLocked = false;
        this.lockRemainingTime = null;
      }
    }, 60000); // 1 minute decrement
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
