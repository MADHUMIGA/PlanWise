package com.example.pmt_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectPostDTO {
    
        
        private String name;
        private String description;
        private String gitUrl;

   
    }
