package com.example.pmt_backend.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
    private String firstName;
    private String email;
    private String skill;
    private String experience;
    private String job;
    private String aboutMe;
    private String gitUrl;
    private String linkedinUrl;
    private String twitterUrl;
}