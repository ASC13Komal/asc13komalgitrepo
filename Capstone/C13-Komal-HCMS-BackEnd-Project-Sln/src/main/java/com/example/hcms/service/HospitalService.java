package com.example.hcms.service;

import com.example.hcms.entity.Hospital;
import com.example.hcms.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    // Get all hospitals
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    // Get a hospital by ID
    public Optional<Hospital> getHospitalById(Long id) {
        return hospitalRepository.findById(id);
    }

    // Create a new hospital
    public Hospital createHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    // Update an existing hospital
    public Hospital updateHospital(Long id, Hospital updatedHospital) {
        return hospitalRepository.findById(id)
                .map(existingHospital -> {
                    existingHospital.setName(updatedHospital.getName());
                    existingHospital.setAddress(updatedHospital.getAddress());
                    existingHospital.setContact(updatedHospital.getContact());
                    return hospitalRepository.save(existingHospital);
                })
                .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + id));
    }

    // Delete a hospital
    public void deleteHospital(Long id) {
        hospitalRepository.deleteById(id);
    }
}
