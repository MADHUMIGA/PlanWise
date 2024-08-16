package com.example.pmt_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Register {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long   regId;
    private  String firstName;
    private  String lastName;
    private  String email;
    private  String password;
   

}
