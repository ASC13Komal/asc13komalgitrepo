package com.example.hcms.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Appointment {

    @Id

    private String id;

    @Column(name = "patient_name")
    private String patientName;
    private String appointmentDate;
    private String appointmentTime;
    private String status; // Scheduled, Completed, or Cancelled

    // Constructors
    public Appointment() {
    }

    public Appointment(String id, String patientName, String appointmentDate, String appointmentTime, String status) {
        this.id=id;
        this.patientName = patientName;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
