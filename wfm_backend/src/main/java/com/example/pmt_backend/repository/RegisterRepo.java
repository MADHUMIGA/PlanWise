package com.example.pmt_backend.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.pmt_backend.model.Register;

public interface RegisterRepo  extends JpaRepository<Register,Long>{
    
    Optional<Register> findByEmail(String email);
    
    @Query("SELECT r.email FROM Register r")
    List<String> findAllEmails();
}
