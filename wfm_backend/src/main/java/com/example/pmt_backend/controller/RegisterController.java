package com.example.pmt_backend.controller;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.pmt_backend.CustomExceptions.UserAlreadyExistsException;
import com.example.pmt_backend.Security.JWTAuthFilter;
import com.example.pmt_backend.Security.JWTUtil;
import com.example.pmt_backend.model.Register;
import com.example.pmt_backend.service.RegisterService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RegisterController {

    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);

    @Autowired
    private RegisterService registerService;

    @Autowired
    private PasswordEncoder passwordEncoder;

     @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;



    @PostMapping("/register")
    public ResponseEntity<?> newRegister(@RequestBody Register register) {
        try {
            // Encode the password
            register.setPassword(passwordEncoder.encode(register.getPassword()));

            // Save the registration and check for existing users
            Register reg = registerService.saveRegister(register);
            return new ResponseEntity<>(reg, HttpStatus.CREATED);

        } catch (UserAlreadyExistsException e) {
            // Handle the case where the email is already registered
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);

        } catch (Exception e) {
            // Handle any other errors during registration
            logger.error("Error registering user: ", e);
            return new ResponseEntity<>("Error registering user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



      @GetMapping("/register-emails")
    public ResponseEntity<?> getAllEmails(HttpServletRequest request) {
        try {
            // Extract JWT token from cookies
         String token = jwtAuthFilter.extractJwtFromRequest(request);

        if (token == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = jwtUtil.getUsernameFromToken(token);

        if (email == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
            // Fetch all registered email IDs
            List<String> emails = registerService.getAllEmails();
            return new ResponseEntity<>(emails, HttpStatus.OK);

        } catch (Exception e) {
            // Handle any errors during the process
            logger.error("Error fetching email IDs: ", e);
            return new ResponseEntity<>("Error fetching email IDs: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

}



  
     // Login endpoint
    //  @PostMapping("/signin")
    //  public ResponseEntity<?> login(@RequestBody Register loginRequest) {
    //      try {
    //          Register reg = registerService.findByEmail(loginRequest.getEmail());
    //          if (reg != null && reg.getPassword().equals(loginRequest.getPassword())) {
    //              logger.info("Login successful for user: " + loginRequest.getEmail());
    //              return new ResponseEntity<>(reg, HttpStatus.OK);
    //          } else if (reg == null) {
    //              return new ResponseEntity<>("Email not registered", HttpStatus.NOT_FOUND);
    //          } else {
    //              return new ResponseEntity<>("Incorrect password", HttpStatus.UNAUTHORIZED);
    //          }
    //      } catch (Exception e) {
    //          logger.error("Error logging in user: ", e);
    //          return new ResponseEntity<>("Error logging in user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    //      }
    //  }

   
