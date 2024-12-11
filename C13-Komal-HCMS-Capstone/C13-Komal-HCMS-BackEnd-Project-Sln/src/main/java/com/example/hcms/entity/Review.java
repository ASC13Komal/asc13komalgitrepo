package com.example.hcms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Reviews")
public class Review {
    @Id

    private String id; // Unique ID for the review

    private Long doctorId; // Reference to the doctor's ID
    private Long patientId; // Reference to the patient's ID
    private int rating; // Rating (1 to 5)
    private String comments; // Review comments


    public Review(){
    }

    public  Review(String id,Long doctorId,Long patientId,int rating,String comments){
        this.id=id;
        this.doctorId=doctorId;
        this.patientId=patientId;
        this.rating=rating;
        this.comments=comments;
    }
    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
