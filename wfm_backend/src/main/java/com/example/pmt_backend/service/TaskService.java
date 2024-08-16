package com.example.pmt_backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pmt_backend.DTO.TaskNameDTO;
import com.example.pmt_backend.DTO.TaskResponseDTO;
import com.example.pmt_backend.model.Project;
import com.example.pmt_backend.model.Task;
import com.example.pmt_backend.model.User;
import com.example.pmt_backend.repository.ProjectRepo;
import com.example.pmt_backend.repository.TaskRepo;
import com.example.pmt_backend.repository.UserRepo;

// TaskService.java
@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepository;

    @Autowired
    private ProjectRepo projectRepository;

    @Autowired
    private UserRepo userRepository;

    // Define a formatter
private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    public Task createTask(Task task, String projectName, List<String> assigneeIds , String email) {


        User userr = userRepository.findByEmail(email);
        if (userr == null) {
            throw new RuntimeException("User not found");
        }

        task.setCreatedBy(userr);
        
    
        // Add the project to the user's list of projects
        userr.getTasks().add(task);




        // Set default creation date if not provided
        if (task.getCreatedAt() == null || task.getCreatedAt().toString().isEmpty()) {
            task.setCreatedAt(LocalDateTime.now());
        }

        // Default estimates if not provided
        if (task.getOptimisticEstimate() == 0) {
            task.setOptimisticEstimate(3); // Example default
        }
        if (task.getMostLikelyEstimate() == 0) {
            task.setMostLikelyEstimate(5); // Example default
        }
        if (task.getPessimisticEstimate() == 0) {
            task.setPessimisticEstimate(7); // Example default
        }

        // Link to the project
        Project project = projectRepository.findByName(projectName)
            .orElseThrow(() -> new NoSuchElementException("Project not found with name " + projectName));
        task.setProject(project);
        project.getTasks().add(task);

        // Link to assignees
        if (assigneeIds != null) {
            Set<User> assignees = new HashSet<>();
            for (String userId : assigneeIds) {
                User user = userRepository.findByEmail(userId);
                    
                assignees.add(user);
                user.getTasks().add(task);
            }
            task.setAssignees(assignees);
        }

        Task savedTask = taskRepository.save(task);
        projectRepository.save(project); // Ensure project is updated with new task
        for (User user : task.getAssignees()) {
            userRepository.save(user); // Ensure users are updated with new task
        }

        adjustTaskTimeline(savedTask);
        return savedTask;
    }

    public void addDependencies(Long taskId, List<Long> dependencyIds) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new NoSuchElementException("Task not found with id " + taskId));
    
        for (Long dependencyId : dependencyIds) {
            Task dependency = taskRepository.findById(dependencyId)
                .orElseThrow(() -> new NoSuchElementException("Dependency task not found with id " + dependencyId));
    
            task.getDependencies().add(dependency);
        }
        
        taskRepository.save(task);
        adjustTaskTimeline(task);
    }
    

    private void adjustTaskTimeline(Task task) {
        List<Task> dependencies = new ArrayList<>(task.getDependencies());
        if (!dependencies.isEmpty()) {
            // Find the latest end date among dependencies
            Task latestDependency = dependencies.stream()
                .max(Comparator.comparing(Task::getEndDate))
                .orElseThrow(() -> new RuntimeException("No valid dependencies found"));

            // Set the start date of the current task to the day after the latest dependency ends
            LocalDateTime adjustedStartDate = latestDependency.getEndDate().plusDays(1);
            task.setStartDate(adjustedStartDate);

            // Calculate the new end date based on the most likely estimate
            int duration = calculateDuration(task);
            task.setEndDate(adjustedStartDate.plusDays(duration));
        } else {
            // If no dependencies, calculate duration based on estimates
            int duration = calculateDuration(task);
            task.setStartDate(task.getCreatedAt().plusDays(1)); // Default start date if no dependencies
            task.setEndDate(task.getStartDate().plusDays(duration));
        }

        taskRepository.save(task);
    }

    private int calculateDuration(Task task) {
        // Use the PERT formula to calculate duration based on estimates
        return (task.getOptimisticEstimate() + 4 * task.getMostLikelyEstimate() + task.getPessimisticEstimate()) / 6;
    }


///get
     public List<TaskResponseDTO> getTasksByProject(String projectName) {
        // Fetch the project by name
        Project project = projectRepository.findByName(projectName)
            .orElseThrow(() -> new RuntimeException("Project not found with name " + projectName));

        // Fetch all tasks for the given project
        Set<Task> tasks = project.getTasks();

        // Convert tasks to DTOs
        return tasks.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private TaskResponseDTO convertToDTO(Task task) {
        TaskResponseDTO dto = new TaskResponseDTO();
        dto.setId(task.getId());
        dto.setHeading(task.getHeading());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setType(task.getType());
        dto.setPriority(task.getPriority());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setStartDate(task.getStartDate().format(FORMATTER));
        dto.setEndDate(task.getEndDate().format(FORMATTER));
        dto.setOptimisticEstimate(task.getOptimisticEstimate());
        dto.setMostLikelyEstimate(task.getMostLikelyEstimate());
        dto.setPessimisticEstimate(task.getPessimisticEstimate());
        // Fetch assignees
        List<String> assigneeEmails = task.getAssignees().stream()
            .map(User::getEmail)
            .collect(Collectors.toList());
        dto.setAssigneeEmails(assigneeEmails);

        if (task.getCreatedBy() != null) {
            dto.setCreatedBy(task.getCreatedBy().getFirstName());
        }

        return dto;

    }

    //getnames
    public List<TaskNameDTO> getTaskNamesByProject(String projectName , Long taskId) {
        // Fetch the project by name
        Project project = projectRepository.findByName(projectName)
            .orElseThrow(() -> new RuntimeException("Project not found with name " + projectName));

        // Fetch all tasks for the given project
        Set<Task> tasks = project.getTasks();

        // Convert tasks to DTOs
        return tasks.stream()
        .filter(task -> !task.getId().equals(taskId))  // Filter out the task with the given taskId
        .map(this::convertToNameDTO)
        .collect(Collectors.toList());
    }

    private TaskNameDTO convertToNameDTO(Task task) {
        TaskNameDTO dto = new TaskNameDTO();
       
        dto.setId(task.getId());
        dto.setHeading(task.getHeading());
        return dto;

    }


    //delete
   public void deleteTask(Long taskId) {
    // Find the task
    Task task = taskRepository.findById(taskId)
        .orElseThrow(() -> new NoSuchElementException("Task not found with id " + taskId));

    // Handle dependencies: Update or remove references to the task being deleted
    List<Task> dependentTasks = taskRepository.findAllByDependenciesContaining(task);

    for (Task dependentTask : dependentTasks) {
        // Remove the deleted task from the dependencies of each dependent task
        dependentTask.getDependencies().remove(task);

        // Recalculate the end date for the dependent task
        adjustTaskTimeline(dependentTask);
        taskRepository.save(dependentTask); // Save the changes for each dependent task
    }

    // Remove task from project
    Project project = task.getProject();
    if (project != null) {
        project.getTasks().remove(task);
        projectRepository.save(project); // Save project without the task
    }

    // Remove task from assignees
    Set<User> assignees = task.getAssignees();
    for (User user : assignees) {
        user.getTasks().remove(task);
        userRepository.save(user); // Save user without the task
    }

    // Delete the task
    taskRepository.delete(task);
}


//get dependency
public List<TaskNameDTO> getDependentTaskNames(Long taskId) {
    // Fetch the task by ID with dependencies
    Task task = taskRepository.findByIdWithDependencies(taskId);

    // Log the task and its dependencies
    System.out.println("Fetched Task: " + task.getHeading());
    task.getDependencies().forEach(dep -> System.out.println("Dependency: " + dep.getHeading()));

    // Find tasks that have the given task as a dependency
    List<Task> dependentTasks = taskRepository.findAllByTaskIdAsDependency(taskId);

    // Convert tasks to DTOs
    return dependentTasks.stream()
        .map(this::convertToDepentDTO)
        .collect(Collectors.toList());
}

private TaskNameDTO convertToDepentDTO(Task task) {
    TaskNameDTO dto = new TaskNameDTO();
    dto.setId(task.getId());
    dto.setHeading(task.getHeading());
    return dto;
}

}


