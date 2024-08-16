package com.example.pmt_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pmt_backend.CustomExceptions.UserAlreadyExistsException;
import com.example.pmt_backend.model.Register;
import com.example.pmt_backend.model.User;
import com.example.pmt_backend.repository.RegisterRepo;
import com.example.pmt_backend.repository.UserRepo;




@Service
public class RegisterService {

     @Autowired
     private RegisterRepo registerRepo;

     @Autowired
     private UserRepo userRepo;

   
      // Method to save a new registration
    public Register saveRegister(Register register) throws UserAlreadyExistsException {
        // Check if the email already exists
        if (registerRepo.findByEmail(register.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already registered");
        }

        try {
            Register savedRegister = registerRepo.save(register);
            
            // Create and save User entity
            User user = new User();
            user.setFirstName(register.getFirstName());
            user.setEmail(register.getEmail());
            // You can also set other default values or leave them null.
            userRepo.save(user);

            return savedRegister;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Register findByEmail(String email) {
        return registerRepo.findByEmail(email).orElse(null);

    }

    // public List<String> getAllEmails() {
    //     return registerRepo.findAllEmails();
    // }



    //

    public List<String> getAllEmails() {
        return registerRepo.findAll()
                                  .stream()
                                  .map(Register::getEmail)
                                  .collect(Collectors.toList());
    }

}