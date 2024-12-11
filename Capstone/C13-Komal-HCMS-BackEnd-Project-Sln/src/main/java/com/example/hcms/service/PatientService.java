package com.example.hcms.service;

import com.example.hcms.entity.Patient;
import com.example.hcms.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get a patient by ID
    public Optional<Patient> getPatientById(Integer id) {
        return patientRepository.findById(id);
    }

    // Add a new patient
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Update a patient
    public Patient updatePatient(Integer id, Patient updatedPatient) {
        return patientRepository.findById(id)
                .map(existingPatient -> {
                    existingPatient.setName(updatedPatient.getName());
                    existingPatient.setDob(updatedPatient.getDob());
                    existingPatient.setAddress(updatedPatient.getAddress());
                    existingPatient.setPhone(updatedPatient.getPhone());
                    existingPatient.setEmail(updatedPatient.getEmail());
                    return patientRepository.save(existingPatient);
                })
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    }

    // Delete a patient
    public void deletePatient(Integer id) {
        patientRepository.deleteById(id);
    }
}
