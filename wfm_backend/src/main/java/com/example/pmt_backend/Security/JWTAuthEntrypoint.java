package com.example.pmt_backend.Security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthEntrypoint implements AuthenticationEntryPoint {
    private static final Logger logger = LoggerFactory.getLogger(JWTAuthEntrypoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        logger.error("Unauthorized error: {}", authException.getCause()+": "+authException.getMessage());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        //custome exception
        Exception exception = (Exception) request.getAttribute("exception");

		String message;

		if (exception != null) {
			
			if (exception.getCause() != null) {
				message = exception.getCause().toString() + " " + exception.getMessage();
			} else {
				message = exception.getMessage();
			}

		} else {

			if (authException.getCause() != null) {
				message = authException.getCause().toString() + " " + authException.getMessage();
			} else {
				message = authException.getMessage();
			}

		}
        final Map<String, Object> body = new HashMap<>();
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        body.put("error", message);
        body.put("message", authException.getMessage());
        body.put("path", request.getServletPath());

        final ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getOutputStream(), body);
    }
}
