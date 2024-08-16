
package com.example.pmt_backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.pmt_backend.Security.CustomUserDetailsService;
import com.example.pmt_backend.Security.JWTAuthEntrypoint;
import com.example.pmt_backend.Security.JWTAuthFilter;





@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	@Autowired
	private JWTAuthEntrypoint jwtAuthEntrypoint;

	@Autowired
	private JWTAuthFilter jwtAuthFilter;
	//authorization bean
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable());
		http.authorizeHttpRequests((requests) -> requests
			.requestMatchers("/register", "/signin").permitAll()
			.anyRequest().authenticated());


				// Ensure stateless session management
				// This means that Spring Security will not create or use an HTTP session to store any security information.
				// Each request will be authenticated independently, typically using a JWT.
		http.sessionManagement(session -> session
		    .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
                // Configure X-Frame-Options header to allow framing from the same origin only
		http.headers(headers -> headers
            .frameOptions(frameOptions -> frameOptions
            .sameOrigin()));

                // Handle unauthorized access attempts
		http.exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthEntrypoint));

                // Add the JWT authentication filter before the default UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtAuthFilter,UsernamePasswordAuthenticationFilter.class);

		        // http.formLogin().loginPage("/signin").permitAll();
		        // http.httpBasic(Customizer.withDefaults()); // Basic authentication
		        //http.formLogin(Customizer.withDefaults()); //form based authentication

		return http.build();
	}


	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	//credential based authentication
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider Provider = new DaoAuthenticationProvider();
		Provider.setUserDetailsService(userDetailsService());
		Provider.setPasswordEncoder(passwordEncoder());
		return Provider;
	}

	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}
	
	//authentication bean
	@Bean
	public UserDetailsService userDetailsService() {
		return new CustomUserDetailsService();
	}
	

	

}         
