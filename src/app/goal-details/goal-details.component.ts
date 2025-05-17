import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css'],
})
export class GoalDetailsComponent implements OnInit {
  goalData: any = {}; // To store goal data

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve query params from the URL
    this.route.queryParams.subscribe((params) => {
      this.goalData = params;
    });
  }
}
