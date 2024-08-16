package com.example.pmt_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pmt_backend.DTO.UserGetDTO;
import com.example.pmt_backend.DTO.UserProfileDTO;
import com.example.pmt_backend.DTO.UserUpdateDTO;
import com.example.pmt_backend.model.Project;
import com.example.pmt_backend.model.User;
import com.example.pmt_backend.repository.ProjectRepo;
import com.example.pmt_backend.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProjectRepo projectRepo;

  
   //update
    public User updateUserDetails(String email, UserUpdateDTO userUpdateDTO) {
        // Fetch the user based on the email from JWT
        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Update the user details
        user.setSkill(userUpdateDTO.getSkill());
        user.setExperience(userUpdateDTO.getExperience());
        user.setJob(userUpdateDTO.getJob());
        user.setAboutMe(userUpdateDTO.getAboutMe());
        user.setGitUrl(userUpdateDTO.getGitUrl());
        user.setLinkedinUrl(userUpdateDTO.getLinkedinUrl());
        user.setTwitterUrl(userUpdateDTO.getTwitterUrl());

        // Save the updated user details
        return userRepo.save(user);
    }


    //getprofile
    public UserProfileDTO getUserProfile(String email) {
        // Fetch the user based on the email
        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Convert User entity to UserProfileDTO
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setFirstName(user.getFirstName());
        userProfileDTO.setEmail(user.getEmail());
        userProfileDTO.setSkill(user.getSkill());
        userProfileDTO.setExperience(user.getExperience());
        userProfileDTO.setJob(user.getJob());
        userProfileDTO.setAboutMe(user.getAboutMe());
        userProfileDTO.setGitUrl(user.getGitUrl());
        userProfileDTO.setLinkedinUrl(user.getLinkedinUrl());
        userProfileDTO.setTwitterUrl(user.getTwitterUrl());

        return userProfileDTO;
    }


    //getallinprojects
      public List<UserGetDTO> getUsersByProject(String projectName) {
        // Fetch the project by name
        Project project = projectRepo.findByName(projectName).orElse(null);

        if (project == null) {
            throw new RuntimeException("Project not found");
        }

        // Extract users associated with the project
        return project.getUsers().stream().map(user -> {
            UserGetDTO dto = new UserGetDTO();
            dto.setFirstName(user.getFirstName());
            dto.setEmail(user.getEmail());
            dto.setJob(user.getJob());
            dto.setAboutMe(user.getAboutMe());
            dto.setGitUrl(user.getGitUrl());
            dto.setLinkedinUrl(user.getLinkedinUrl());
            dto.setTwitterUrl(user.getTwitterUrl());
            return dto;
        }).collect(Collectors.toList());
    }
}
















//    public Users updateUserProfile(UserUpdateDTO userProfileDTO) {
//         Users user = userRepo.findByEmail(userProfileDTO.getEmail())
//                         .orElseThrow(() -> new RuntimeException("User not found"));

//         user.setSkill(userProfileDTO.getSkill());
//         user.setExperience(userProfileDTO.getExperience());

//         return userRepo.save(user);
//     }

//     public UserProfileDTO getUserByEmail(String email) {
//         Users user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
//         return new UserProfileDTO(user.getUname(), user.getEmail(), user.getSkill(), user.getExperience());
//     }

//     //invoked by projectService
//     public Users findByEmail(String email) {
//         return userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
//     }

//     public Users save(Users user) {
//         return userRepo.save(user);
//     }

    

