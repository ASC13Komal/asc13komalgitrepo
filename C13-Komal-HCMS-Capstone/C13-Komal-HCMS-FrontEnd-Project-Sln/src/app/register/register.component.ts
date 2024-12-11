import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  existingEmails: string[] = ['pavi@gmail.com', 'pallu@gmail.com'];
  existingPhones: string[] = ['9876543210', '1234567890'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}')
        ]
      ],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Field Getters
  get name() {
    return this.registerForm.get('name')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get phone() {
    return this.registerForm.get('phone')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

  // Error Message Methods
  getNameErrorMessage() {
    if (this.name.hasError('required')) return 'Name is required.';
    if (this.name.hasError('pattern')) return 'Name can only contain alphabets.';
    return '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) return 'Email cannot be blank.';
    if (this.email.hasError('email')) return 'Enter a valid email address.';
    if (this.existingEmails.includes(this.email.value))
      return 'This email is already in use.';
    return '';
  }

  getPhoneErrorMessage() {
    if (this.phone.hasError('required')) return 'Phone number is required.';
    if (this.phone.hasError('pattern')) return 'Enter a valid 10-digit phone number.';
    if (this.existingPhones.includes(this.phone.value))
      return 'This phone number is already in use.';
    return '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) return 'Password cannot be blank.';
    if (this.password.hasError('minlength')) return 'Password must be at least 8 characters.';
    if (this.password.hasError('pattern'))
      return 'Password must contain uppercase, lowercase, digit, and special character.';
    return '';
  }

  // Custom Validator: Password Match
  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : { mismatch: true };
  }

  // Registration Handler
  onRegister() {
    const { email, phone } = this.registerForm.value;

    if (this.existingEmails.includes(email)) {
      this.errorMessage = 'This email is already in use.';
      return;
    }

    if (this.existingPhones.includes(phone)) {
      this.errorMessage = 'This phone number is already in use.';
      return;
    }

    if (this.registerForm.valid) {
      // alert('Registration successful!');
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Please fix the errors before submitting.';
    }
  }
}
