package com.example.hcms.service;

import com.example.hcms.entity.Appointment;
import com.example.hcms.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Get an appointment by ID
    public Optional<Appointment> getAppointmentById(String id) {
        return appointmentRepository.findById(id);
    }

    // Add a new appointment
    public Appointment addAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // Update an existing appointment
    public Appointment updateAppointment(String id, Appointment updatedAppointment) {
        return appointmentRepository.findById(id)
                .map(existingAppointment -> {

                    existingAppointment.setPatientName(updatedAppointment.getPatientName());
                    existingAppointment.setAppointmentDate(updatedAppointment.getAppointmentDate());
                    existingAppointment.setAppointmentTime(updatedAppointment.getAppointmentTime());
                    existingAppointment.setStatus(updatedAppointment.getStatus());
                    return appointmentRepository.save(existingAppointment);
                })
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }

    // Delete an appointment
    public void deleteAppointment(String id) {
        appointmentRepository.deleteById(id);
    }
}
