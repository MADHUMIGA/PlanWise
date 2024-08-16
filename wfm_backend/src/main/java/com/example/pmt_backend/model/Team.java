// package com.example.pmt_backend.model;

// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// import java.util.HashSet;
// import java.util.Set;

// import com.fasterxml.jackson.annotation.JsonBackReference;
// import com.fasterxml.jackson.annotation.JsonManagedReference;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinTable;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToMany;
// import jakarta.persistence.OneToOne;

// @Entity
// @NoArgsConstructor
// @Getter
// @Setter
// public class Team {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long teamId;
//     private String tname;

//     @OneToOne(mappedBy = "team")
//     @JsonBackReference
//     private Projects project;

//     @ManyToMany
//     @JsonManagedReference
//     @JoinTable(
//         name = "TeamUsers",
//         joinColumns = @JoinColumn(name = "team_id"),
//         inverseJoinColumns = @JoinColumn(name = "uid"))
//     private Set<Users> users = new HashSet<>();
// }