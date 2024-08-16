package com.example.pmt_backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pmt_backend.CustomExceptions.ProjectAlreadyExistsException;
import com.example.pmt_backend.DTO.ProjectGetDTO;
import com.example.pmt_backend.DTO.ProjectPostDTO;
import com.example.pmt_backend.DTO.UserProfileDTO;
import com.example.pmt_backend.model.Project;
import com.example.pmt_backend.model.User;
import com.example.pmt_backend.repository.ProjectRepo;

import com.example.pmt_backend.repository.UserRepo;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepo projectRepo;


    @Autowired
    private UserService userService;


    @Autowired
    private UserRepo userRepo;



//post
   public Project createProject(ProjectPostDTO projectRequest, String email) {
    // Fetch the user based on the email from JWT
    User user = userRepo.findByEmail(email);

    if (user == null) {
        throw new RuntimeException("User not found");
    }

    // Check if a project with the same name already exists for this user
    if (projectRepo.existsByNameAndCreatedBy(projectRequest.getName(), user)) {
        throw new ProjectAlreadyExistsException("You already have a project with this name.");
    }

    // Create a new project
    Project project = new Project();
    project.setName(projectRequest.getName());
    project.setDescription(projectRequest.getDescription());
    project.setGitUrl(projectRequest.getGitUrl());
    project.setCreatedAt(LocalDateTime.now());

    // Set the createdBy field and add user to the project
    project.setCreatedBy(user);
    project.getUsers().add(user);

    // Add the project to the user's list of projects
    user.getProjects().add(project);

    // Save the project in the database
    return projectRepo.save(project);
}


//put

public Project updateProject(String name, ProjectPostDTO projectRequest, String email) {
    // Fetch the user based on the email from JWT
    User user = userRepo.findByEmail(email);

    if (user == null) {
        throw new RuntimeException("User not found");
    }

    // Fetch the project to be updated
    Project project = projectRepo.findByName(name)
            .orElseThrow(() -> new NoSuchElementException("Project not found"));

    // Check if the project belongs to the user
    if (!project.getCreatedBy().equals(user)) {
        throw new RuntimeException("Unauthorized to update this project");
    }

    // Update the project details
    project.setName(projectRequest.getName());
    project.setDescription(projectRequest.getDescription());
    project.setGitUrl(projectRequest.getGitUrl());

    // Save the updated project
    return projectRepo.save(project);
}





    /////get

    public List<ProjectGetDTO> getProjectsByUserEmail(String email) {
        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Project> projects = projectRepo.findByCreatedBy(user);

        return projects.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

   


    //getnotcreated
    public List<ProjectGetDTO> getProjectsByUserNotCreatedBy(String email) {
        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Project> projects = projectRepo.findProjectsByUserNotCreatedBy(email);

        return projects.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    //method for converting Project to ProjectGetDTO
    private ProjectGetDTO convertToDTO(Project project) {
        return new ProjectGetDTO(
           
            project.getName(),
            project.getDescription(),
            project.getGitUrl(),
            project.getCreatedAt(),
            project.getCreatedBy().getFirstName()
        );
    }


/////////////////////////////////

 //delete

 public void deleteProjectByName(String name, String email) {
    // Fetch the user based on the email from JWT
    User user = userRepo.findByEmail(email);

    if (user == null) {
        throw new RuntimeException("User not found");
    }

    // Fetch the project to be deleted
    Project project = projectRepo.findByName(name)
            .orElseThrow(() -> new NoSuchElementException("Project not found"));

    // Check if the project belongs to the user
    if (!project.getCreatedBy().equals(user)) {
        throw new RuntimeException("Unauthorized to delete this project");
    }

    // Remove the project from the user's list of projects
    user.getProjects().remove(project);

    // Delete the project from the database
    projectRepo.delete(project);
}


public void addUsersToProject(String projectName, List<String> emails) {
    // Fetch the project
    Project project = projectRepo.findByName(projectName)
            .orElseThrow(() -> new NoSuchElementException("Project not found"));

    // Fetch users by emails
    List<User> users = userRepo.findByEmailIn(emails);

    if (users.size() != emails.size()) {
        throw new RuntimeException("One or more users not found");
    }

    // Add users to the project
    project.getUsers().addAll(users);

    // Save the updated project
    projectRepo.save(project);
}




public List<String> getUserEmailsByProject(String projectName) {
    Project project = projectRepo.findByName(projectName)
            .orElseThrow(() -> new NoSuchElementException("Project not found"));

    return project.getUsers().stream()
            .map(User::getEmail)
            .collect(Collectors.toList());
}

}




    





















//     public Projects addProject(String email, Projects project) {
//         Users user = userService.findByEmail(email);

//         project.getUsers().add(user);

//         projectRepo.save(project);

//         user.getProjects().add(project);
//         userService.save(user); // Ensure you have a save method in UserService

//         return project;
//     }

//    //projectNames
//     public List<String> getProjectNamesByUserEmail(String email) {
//         // This method can call a repository method or directly execute a query
//         return projectRepo.findProjectNamesByUserEmail(email);
//     }

//     //projectDetails
//     public ProjectDetailsDTO getProjectDetailsByName(String pname) {
//         Projects project = projectRepo.findByPname(pname)
//             .orElseThrow(() -> new RuntimeException("Project not found"));

//         // Convert Projects entity to ProjectDetailsDTO
//         return convertToDTO(project);
//     }

//     private ProjectDetailsDTO convertToDTO(Projects project) {
//         ProjectDetailsDTO dto = new ProjectDetailsDTO();
//         dto.setPid(project.getPid());
//         dto.setPname(project.getPname());
//         dto.setGiturl(project.getGiturl());
//         dto.setDescription(project.getDescription());
//         // Set other fields as needed
//         return dto;
//     }

//     //updateDetails
//     public ProjectDetailsDTO updateProjectDetailsByName(String pname, ProjectDetailsDTO projectDTO) {
//         Projects existingProject = projectRepo.findByPname(pname).orElse(null);
//         if (existingProject == null) {
//             throw new IllegalArgumentException("Project not found with name: " + pname);
//         }

//         existingProject.setPname(projectDTO.getPname());
//         existingProject.setGiturl(projectDTO.getGiturl());
//         existingProject.setDescription(projectDTO.getDescription());

//         Projects updatedProject = projectRepo.save(existingProject);

//         return new ProjectDetailsDTO(updatedProject.getPid(), updatedProject.getPname(), updatedProject.getGiturl(), updatedProject.getDescription());
//     }

//     //team
//     //addingTeamMembers
//     public void addUsersToProject(String projectName, List<String> userEmails) {
//         Projects project = projectRepo.findByPname(projectName)
//                 .orElseThrow(() -> new RuntimeException("Project not found"));

//         // Check if the team already exists, otherwise create a new one
//         Team team = project.getTeam();
//         if (team == null) {
//             team = new Team();
//             team.setTname(projectName + " team");
//             team.setProject(project);
//             project.setTeam(team);
//             teamRepo.save(team);
//         }

//         // Find users and add them to the project and team
//         Set<Users> users = userEmails.stream()
//                 .map(email -> userRepo.findByEmail(email)
//                         .orElseThrow(() -> new RuntimeException("User not found: " + email)))
//                 .collect(Collectors.toSet());

//         project.getUsers().addAll(users);
//         team.getUsers().addAll(users);

//         // Save updated entities
//         projectRepo.save(project);
//         teamRepo.save(team);
//     }


//     //GettingTeamMembers

//     public List<UserProfileDTO> getUsersByProjectName(String pname) {
//         Set<Users> users = projectRepo.findUsersByProjectName(pname);

//         return users.stream()
//                 .map(this::convertToDTO)
//                 .collect(Collectors.toList());
//     }

//     private UserProfileDTO convertToDTO(Users user) {
//         UserProfileDTO dto = new UserProfileDTO();
//         dto.setName(user.getUname());
//         dto.setEmail(user.getEmail());
//         dto.setSkill(user.getSkill());
//         dto.setExperience(user.getExperience());
//         return dto;
//     }

    
