package com.example.pmt_backend.Security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.pmt_backend.model.Register;
import com.example.pmt_backend.repository.RegisterRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    	
    @Autowired
    private RegisterRepo registerRepo;
 
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Register> userInfoOptional = registerRepo.findByEmail(email);
        if (!userInfoOptional.isPresent()) {
			throw new UsernameNotFoundException("Username: " + email + " not found");
        } 
		Register userInfo = userInfoOptional.get();
		return User.builder()
				.username(userInfo.getEmail())
				.password(userInfo.getPassword())
				.build();
		
        }
           
}
