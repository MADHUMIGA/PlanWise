package com.example.pmt_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pmt_backend.DTO.TaskNameDTO;
import com.example.pmt_backend.DTO.TaskRequestDTO;
import com.example.pmt_backend.DTO.TaskResponseDTO;
import com.example.pmt_backend.Security.JWTAuthFilter;
import com.example.pmt_backend.Security.JWTUtil;
import com.example.pmt_backend.model.Task;
import com.example.pmt_backend.service.TaskService;

import jakarta.servlet.http.HttpServletRequest;

// TaskController.java
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @PostMapping("/create/{projectName}")
    public ResponseEntity<?> createTask(@RequestBody TaskRequestDTO taskRequest,
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

        // return new ResponseEntity<>(HttpStatus.CREATED);
        try {
            Task createdTask = taskService.createTask(
                taskRequest.getTask(),
                projectName,
                taskRequest.getAssigneeIds(),email
            );
            return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Handle exceptions
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{taskId}/add-dependencies")
public ResponseEntity<?> addDependencies(@PathVariable Long taskId,
                                         @RequestBody List<Long> dependencyIds,
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
        taskService.addDependencies(taskId, dependencyIds);
        return new ResponseEntity<>(HttpStatus.OK);
    } catch (RuntimeException e) {
        // Handle exceptions
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}



    @GetMapping("/project/{projectName}")
    public ResponseEntity<?> getTasksByProject(@PathVariable String projectName,
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
            List<TaskResponseDTO> tasks = taskService.getTasksByProject(projectName);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Handle exceptions
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/names/{taskId}/{projectName}")
    public ResponseEntity<?> getTaskNamesByProject(@PathVariable Long taskId,
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
            List<TaskNameDTO> tasks = taskService.getTaskNamesByProject(projectName , taskId);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Handle exceptions
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
      @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId, HttpServletRequest request) {
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
            taskService.deleteTask(taskId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            // Handle exceptions
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/dependencies/{taskId}")
    public ResponseEntity<?> getDependentTaskNames(@PathVariable Long taskId, HttpServletRequest request) {
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
            List<TaskNameDTO> dependentTasks = taskService.getDependentTaskNames(taskId);
            return new ResponseEntity<>(dependentTasks, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Handle exceptions
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

