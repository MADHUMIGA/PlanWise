package com.example.pmt_backend.controller;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pmt_backend.CustomExceptions.ProjectAlreadyExistsException;
import com.example.pmt_backend.DTO.ProjectGetDTO;
import com.example.pmt_backend.DTO.ProjectPostDTO;
import com.example.pmt_backend.Security.JWTAuthFilter;
import com.example.pmt_backend.Security.JWTUtil;
import com.example.pmt_backend.model.Project;
import com.example.pmt_backend.service.ProjectService;


import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @PostMapping("/create")
    public ResponseEntity<?> createProject(@RequestBody ProjectPostDTO projectRequest,
                                           HttpServletRequest request) {
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
            Project project = projectService.createProject(projectRequest, email);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (ProjectAlreadyExistsException e) {
            // Custom exception to handle project name conflicts
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (RuntimeException e) {
            // Handle other runtime exceptions
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping("/update/{name}")
    public ResponseEntity<?> updateProject(
            @PathVariable String name,
            @RequestBody ProjectPostDTO projectRequest,
            HttpServletRequest request) {

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
            Project updatedProject = projectService.updateProject(name, projectRequest, email);
            return new ResponseEntity<>(updatedProject, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    


    @GetMapping("/my-projects")
    public ResponseEntity<List<ProjectGetDTO>> getMyProjects(HttpServletRequest request) {
        String token = jwtAuthFilter.extractJwtFromRequest(request);

        if (token == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String email = jwtUtil.getUsernameFromToken(token);

        if (email == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<ProjectGetDTO> projects = projectService.getProjectsByUserEmail(email);

        if (projects.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(projects, HttpStatus.OK);
    }


    @GetMapping("/my-participated-projects")
public ResponseEntity<List<ProjectGetDTO>> getParticipatedProjects(HttpServletRequest request) {
    String token = jwtAuthFilter.extractJwtFromRequest(request);

    if (token == null) {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    String email = jwtUtil.getUsernameFromToken(token);

    if (email == null) {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    List<ProjectGetDTO> projects = projectService.getProjectsByUserNotCreatedBy(email);

    if (projects.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(projects, HttpStatus.OK);
}



     @DeleteMapping("/delete/{name}")
    public ResponseEntity<?> deleteProject(@PathVariable String name, HttpServletRequest request) {
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
            projectService.deleteProjectByName(name, email);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Successfully deleted, no content to return
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/add-users/{name}")
    public ResponseEntity<?> addUsersToProject(
            @PathVariable String name,
            @RequestBody List<String> emailIds,
            HttpServletRequest request) {

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
            projectService.addUsersToProject(name, emailIds);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }




    @GetMapping("/users/{projectName}")
    public ResponseEntity<List<String>> getUserEmailsByProject(
            @PathVariable String projectName,
            HttpServletRequest request) {

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
            // Fetch user emails associated with the project
            List<String> userEmails = projectService.getUserEmailsByProject(projectName);

            if (userEmails.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(userEmails, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.BAD_REQUEST);
        }
    }

}


















// @PostMapping("/add-project/{email}")
// public Project addProject(@PathVariable String email, @RequestBody Project
// project) {

// return projectService.addProject(email, project);
// }

// @GetMapping("/names")
// public List<String> getUserProjectNames(@RequestParam String email) {
// return projectService.getProjectNamesByUserEmail(email);
// }

// @GetMapping("/details")
// public ProjectDetailsDTO getProjectDetailsByName(@RequestParam String pname)
// {
// return projectService.getProjectDetailsByName(pname);
// }

// @PutMapping("/update-details")
// public ProjectDetailsDTO updateProjectDetails(@RequestParam String pname,
// @RequestBody ProjectDetailsDTO projectDTO) {
// return projectService.updateProjectDetailsByName(pname, projectDTO);
// }

// //team
// //teamMembers
// @PostMapping("/add-members")
// public void addUsersToProject(@RequestParam String pname, @RequestBody
// List<String> userEmails) {
// projectService.addUsersToProject(pname, userEmails);
// }

// //TeamMembers
// @GetMapping("/team-members")
// public List<UserProfileDTO> getUsersByProjectName(@RequestParam String pname)
// {
// return projectService.getUsersByProjectName(pname);
// }
