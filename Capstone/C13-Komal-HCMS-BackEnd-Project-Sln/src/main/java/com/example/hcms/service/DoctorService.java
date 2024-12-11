package com.example.hcms.service;

import com.example.hcms.entity.Doctor;
import com.example.hcms.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        Doctor existingDoctor = getDoctorById(id);
        existingDoctor.setName(doctorDetails.getName());
        existingDoctor.setSpecialization(doctorDetails.getSpecialization());
        existingDoctor.setContact(doctorDetails.getContact());
        return doctorRepository.save(existingDoctor);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
