import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'], // Note the corrected property name
})
export class GoalsComponent {
  goalForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form group with form controls
    this.goalForm = this.fb.group({
      goalName: [''],
      goalAmount: [''],
      goalDate: [''],
      goalPriority: [''],
      goalCategory: [''],
      goalDescription: [''],
    });
  }

  // Method to navigate to the goal details page
  viewGoalDetails() {
    const formData = this.goalForm.value; // Capture the form data
    console.log('Goal Data:', formData); // Optional: Log form data for debugging

    // Navigate to the goal details page with query params
    this.router.navigate(['/goal-details'], { queryParams: formData });
  }
}

