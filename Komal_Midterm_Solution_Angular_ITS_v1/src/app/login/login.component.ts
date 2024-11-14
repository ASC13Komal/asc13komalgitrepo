import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    console.log("LoginComponent constructor called");
  }

  ngOnInit(): void {
    console.log("Login Component OnInit called");
    this.loginForm = this.formBuilder.group ({
      loginid: [],
      password: []
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const loginid: string = this.loginForm.get("loginid")?.value;
    const password: string = this.loginForm.get("password")?.value;

    if (loginid === "komal" && password === "pass") {
      console.log("Login Successfull");
      sessionStorage.setItem("loggedIn", "yes");
      this.router.navigate(["/issues"]);
    }
    else {
      console.log("Login failed");
    }
  }
}
