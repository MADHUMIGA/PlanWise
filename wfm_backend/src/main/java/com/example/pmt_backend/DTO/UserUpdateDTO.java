package com.example.pmt_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {
    private String skill;
    private String experience;
    private String job;
    private String aboutMe;
    private String gitUrl;
    private String linkedinUrl;
    private String twitterUrl;
}
