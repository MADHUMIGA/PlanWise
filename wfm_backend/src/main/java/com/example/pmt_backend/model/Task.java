package com.example.pmt_backend.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Task.java
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String heading;
    private String description;
    private String status;
    private String type;
    private String priority;
    private LocalDateTime createdAt;

    // New attributes
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int optimisticEstimate; // in days
    private int mostLikelyEstimate; // in days
    private int pessimisticEstimate; // in days

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @ManyToMany
    @JoinTable(
        name = "task_user",
        joinColumns = @JoinColumn(name = "task_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> assignees = new HashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "task_dependencies",
        joinColumns = @JoinColumn(name = "task_id"),
        inverseJoinColumns = @JoinColumn(name = "dependency_id"))
    private Set<Task> dependencies = new HashSet<>();

    @Version
    private Integer version;
}















// @Entity
// @Getter
// @Setter
// @NoArgsConstructor
// @AllArgsConstructor
// public class Task {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
    
//     private String heading;
//     private String description;
//     private String status;
//     private String type;
//     private String priority;
//     private LocalDateTime createdAt;
//     private LocalDateTime dueDate;

//     @ManyToOne
//     @JoinColumn(name = "project_id", nullable = false)
//     private Project project;

//     @ManyToOne
//     @JoinColumn(name = "created_by", nullable = false)
//     private User createdBy;

//     @ManyToMany
//     @JoinTable(
//         name = "task_user",
//         joinColumns = @JoinColumn(name = "task_id"),
//         inverseJoinColumns = @JoinColumn(name = "user_id"))
//     private Set<User> assignees = new HashSet<>();
// }
