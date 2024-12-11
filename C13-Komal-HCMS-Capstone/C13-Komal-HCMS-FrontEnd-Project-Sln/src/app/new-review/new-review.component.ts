import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../service/review.service';
import { Review } from '../model/hcms.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {
  reviews: Review[] = [];
  filteredReviews: Review[] = [];
  searchRating: number | null = null;

  reviewForm: FormGroup;

  constructor(private fb: FormBuilder, private reviewService: ReviewService, private router: Router) {
    this.reviewForm = this.fb.group({
      doctorId: ['', [Validators.required]],
      patientId: ['', [Validators.required]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comments: ['', [Validators.required]],
    });
  }

  goBack(): void {
    // Navigate to the dashboard route
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews() {
    this.reviewService.getReview().subscribe({
      next: (data) => {
        this.reviews = data;
        this.filteredReviews = data; // Initialize with all reviews
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      },
    });
  }

  generateUniqueId(): string {
    const lastCounter = Number(localStorage.getItem('currentMatchIdCounter')) || 1;
    const uniqueNumber = lastCounter.toString().padStart(4, '0');
    const id = `R${uniqueNumber}`;
    localStorage.setItem('currentMatchIdCounter', (lastCounter + 1).toString());
    return id;
  }

  addReview() {
    const formData = {
      ...this.reviewForm.value,
      id: this.generateUniqueId(),
    };

    this.reviewService.createReview(formData).subscribe({
      next: () => {
        console.log('Review created successfully.');
        this.getReviews();
      },
      error: (error) => {
        console.error('Error creating review:', error);
      },
    });
  }

  deleteReview(reviewId: string) {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        console.log('Review deleted.');
        this.getReviews();
      },
      error: (error) => {
        console.error('Error deleting review:', error);
      },
    });
  }

  searchReviews() {
    if (this.searchRating === null || this.searchRating < 1 || this.searchRating > 5) {
      // alert('Please enter a valid rating between 1 and 5.');
      return;
    }
    this.filteredReviews = this.reviews.filter(
      (review) => review.rating === this.searchRating
    );
  }
}
