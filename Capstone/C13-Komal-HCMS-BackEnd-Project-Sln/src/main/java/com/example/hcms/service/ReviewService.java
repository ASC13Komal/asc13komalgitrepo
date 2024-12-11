package com.example.hcms.service;

import com.example.hcms.entity.Review;
import com.example.hcms.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // Get all reviews
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // Get a single review by ID
    public Review getReviewById(String id) {
        return reviewRepository.findById(id).orElse(null);
    }

    // Add a new review
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> searchReview(String query){
        return reviewRepository.findByNameContainingIgnoreCase(query);
    }

    // Delete a review
    public void deleteReview(String id) {
        reviewRepository.deleteById(id);
    }
}
