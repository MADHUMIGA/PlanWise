package com.example.pmt_backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.pmt_backend.model.Project;
import com.example.pmt_backend.model.User;



public interface ProjectRepo extends JpaRepository<Project,Long>{

      Optional<Project> findByName(String name);

      List<Project> findByCreatedBy(User createdBy);

      boolean existsByNameAndCreatedBy(String name, User createdBy);


      @Query("SELECT p FROM Project p JOIN p.users u WHERE u.email = :email AND p.createdBy.email != :email")
      List<Project> findProjectsByUserNotCreatedBy(String email);




    // Optional<Project> findByPname(String name);
    // List<Project> findAll();


    // @Query("SELECT new com.example.pmt_backend.DTO.ProjectDTO(p.pid, p.pname) FROM Projects p")
    // List<ProjectDTO> findAllProjectNames();

    // @Query("SELECT new com.example.pmt_backend.DTO.ProjectDetailsDTO(p.pid, p.pname, p.giturl, p.description) FROM Projects p WHERE p.pname = :pname")
    // ProjectDetailsDTO findDetailsByPname(String pname);




        //projectNames
    // @Query("SELECT p.pname FROM Users u JOIN u.projects p WHERE u.email = :email")
    // List<String> findProjectNamesByUserEmail(@Param("email") String email);

    // //teamMemebers
    // @Query("SELECT p.users FROM Projects p WHERE p.pname = :pname")
    // Set<User> findUsersByProjectName(@Param("pname") String pname);
}