package com.example.pmt_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.pmt_backend.DTO.UserGetDTO;
import com.example.pmt_backend.DTO.UserProfileDTO;
import com.example.pmt_backend.DTO.UserUpdateDTO;
import com.example.pmt_backend.Security.JWTAuthFilter;
import com.example.pmt_backend.Security.JWTUtil;
import com.example.pmt_backend.model.User;
import com.example.pmt_backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateDTO userUpdateDTO, HttpServletRequest request) {
        // Extract JWT token from cookies
        String token = jwtAuthFilter.extractJwtFromRequest(request);

        if (token == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Get the email/username from the JWT token
        String email = jwtUtil.getUsernameFromToken(token);

        if (email == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        try {
            User updatedUser = userService.updateUserDetails(email, userUpdateDTO);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
        // Extract JWT token from cookies
        String token = jwtAuthFilter.extractJwtFromRequest(request);

        if (token == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Get the email/username from the JWT token
        String email = jwtUtil.getUsernameFromToken(token);

        if (email == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        try {
            UserProfileDTO userProfileDTO = userService.getUserProfile(email);
            return new ResponseEntity<>(userProfileDTO, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


     @GetMapping("/project/{projectName}")
    public ResponseEntity<?> getUsersByProject(@PathVariable String projectName, HttpServletRequest request) {
        // Extract JWT token from cookies
        String token = jwtAuthFilter.extractJwtFromRequest(request);

        if (token == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Get the email/username from the JWT token
        String email = jwtUtil.getUsernameFromToken(token);

        if (email == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        try {
            List<UserGetDTO> users = userService.getUsersByProject(projectName);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}















    //  @PutMapping("/update-user")
    // public Users updateUserProfile(@RequestBody UserUpdateDTO userProfileDTO) {
    //     return userService.updateUserProfile(userProfileDTO);
    // }

    //     @GetMapping("/get-user")
    // public UserProfileDTO getUserByEmail(@RequestParam String email) {
    //     return userService.getUserByEmail(email);
    // }

