package com.example.hcms.repository;

import com.example.hcms.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {
    @Query(value = "SELECT * FROM reviews WHERE LOWER(doctor_id) LIKE LOWER(CONCAT('%', :query, '%'))", nativeQuery = true)
    List<Review> findByNameContainingIgnoreCase(@Param("query") String query);
}
