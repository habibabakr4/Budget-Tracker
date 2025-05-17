import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  signForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    // Initializing the form with validation
    this.signForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Password validation
    });
  }

  // Submit function to handle Firebase authentication
  onSubmit() {
    // Validate form inputs before proceeding
    if (this.signForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const { email, password } = this.signForm.value;

    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        // Clear the error message on success
        this.errorMessage = '';
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      })
      .catch((error) => {
        // Map Firebase error codes to user-friendly messages
        this.errorMessage = this.getFirebaseErrorMessage(error.code);
        console.error('Firebase Error:', error.code, error.message); // Log error for debugging
      });
  }

  // Map Firebase error codes to user-friendly messages
  private getFirebaseErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/user-not-found': 'No user found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/invalid-email': 'The email format is invalid.',
      'auth/user-disabled': 'This account has been disabled.',
    };
    return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
  }
}
