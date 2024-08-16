package com.example.pmt_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.pmt_backend.model.User;



public interface UserRepo extends JpaRepository<User,Long>{
    
    // Optional<Users> findByUname(String name);
    // Optional<User> findByEmail(String email);
    User findByEmail(String email);

    List<User> findByEmailIn(List<String> emails);

    
}

