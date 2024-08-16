package com.example.pmt_backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstName;
    private String email;
    private String skill;
    private String experience;
    private String job;
    private String aboutMe;
    private String gitUrl;
    private String linkedinUrl;
    private String twitterUrl;

    @ManyToMany(mappedBy = "users")
    private Set<Project> projects = new HashSet<>();

    @ManyToMany(mappedBy = "assignees")
    private Set<Task> tasks = new HashSet<>();
}


// public class Users {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long uid;
//     private String uname;
//     private String email;
//     private String skill;
//     private String experience;

//     @ManyToMany(mappedBy = "users")
//     @JsonBackReference
//     private Set<Projects> projects = new HashSet<>();

//     @ManyToMany(mappedBy = "users")
//     @JsonBackReference
//     private Set<Team> teams = new HashSet<>();
// }