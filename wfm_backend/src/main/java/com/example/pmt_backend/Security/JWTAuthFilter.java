package com.example.pmt_backend.Security;


import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.io.IOException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;

import org.springframework.security.authentication.BadCredentialsException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {
    
    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
				
					String jwtToken = extractJwtFromRequest(request);
					try {
						if (jwtToken != null && jwtUtil.validateToken(jwtToken)) {
							String username = jwtUtil.getUsernameFromToken(jwtToken);
							UserDetails userDetails = userDetailsService.loadUserByUsername(username);
		
							UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
									userDetails, null, userDetails.getAuthorities());
		
							SecurityContextHolder.getContext().setAuthentication(authentication);
						} else {
							logger.error("Cannot set the Security Context");
						}
					} catch (ExpiredJwtException ex) {
						request.setAttribute("exception", ex);
					} catch (BadCredentialsException ex) {
						request.setAttribute("exception", ex);
					}
				
				filterChain.doFilter(request, response);
			}
		
			public String extractJwtFromRequest(HttpServletRequest request) {
				Cookie[] cookies = request.getCookies();
				if (cookies != null) {
					for (Cookie cookie : cookies) {
						if ("jwtToken".equals(cookie.getName())) {
							return cookie.getValue();
						}
					}
				}
				return null;
			}
			//
			public String extractJwtFromBearerToken(String bearerToken) {
				if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
					return bearerToken.substring(7);
				}
				return null;
			}
	}



	// 	 try{

	// 		String bearerToken = request.getHeader("Authorization");
			
	// 		String jwtToken = extractJwtFromRequest(bearerToken);

	// 		if (jwtToken != null && jwtUtil.validateToken(jwtToken)) {
    //             String username = jwtUtil.getUsernameFromToken(jwtToken);
	// 			UserDetails userDetails = userDetailsService.loadUserByUsername(username);

    //             // instance of the authenticated user
	// 			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
	// 					userDetails, null, userDetails.getAuthorities());

	// 			// setting the Authentication in the context
    //             // recognize the user on subsequent requests
	// 			SecurityContextHolder.getContext().setAuthentication(authentication);
	// 		} else {
	// 			System.out.println("Cannot set the Security Context");
	// 		}
	// 	 }catch(ExpiredJwtException ex)
	// 	 {
			
	// 			request.setAttribute("exception", ex);
			
	// 	 }
	// 	 catch(BadCredentialsException ex)
	// 	 {
	// 		 request.setAttribute("exception", ex);
	// 	 }
    //      // Continue with next filter chain
	// 	filterChain.doFilter(request, response);
	// }

    // // JWT Token is in the form "Bearer token". Remove Bearer word and
	// // get  only the Token
	// public String extractJwtFromRequest(String bearerToken) {
		
	// 	if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
	// 		return bearerToken.substring(7, bearerToken.length());
	// 	}
	// 	return null;
	// }
   

    

	
    