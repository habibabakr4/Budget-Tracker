import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, public auth: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]]  // Password validation
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.loginForm.invalid) {
      return; // If the form is invalid, prevent submission
    }

    const { email, password } = this.loginForm.value;

    // Firebase user creation logic
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((response: any) => {
        this.router.navigate(['/dashboard']);  // Navigate to dashboard on successful sign-up
      })
      .catch((error: any) => {
        // Handle Firebase errors
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorMessage = 'This email is already in use. Please use a different email.';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'The email format is invalid.';
            break;
          case 'auth/weak-password':
            this.errorMessage = 'Password is too weak. Please use a stronger password.';
            break;
          default:
            this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      });
  }
}

  
