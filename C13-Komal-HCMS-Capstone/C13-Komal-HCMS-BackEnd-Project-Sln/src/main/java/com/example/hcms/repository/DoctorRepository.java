package com.example.hcms.repository;

import com.example.hcms.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // JpaRepository provides all basic CRUD methods, no need to implement manually
}
