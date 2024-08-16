package com.example.pmt_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserGetDTO {
    private String firstName;
    private String email;
    private String job;
    private String aboutMe;
    private String gitUrl;
    private String linkedinUrl;
    private String twitterUrl;
}
