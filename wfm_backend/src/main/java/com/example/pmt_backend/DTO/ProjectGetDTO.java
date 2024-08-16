package com.example.pmt_backend.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectGetDTO {
   
    private String name;
    private String description;
    private String gitUrl;
    private LocalDateTime createdAt;
    private String createdBy;
}
