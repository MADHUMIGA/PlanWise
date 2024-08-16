package com.example.pmt_backend.Security;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JWTUtil {
    private static final Logger logger = LoggerFactory.getLogger(JWTUtil.class);
    @Value("${spring.security.jwt.secret}")
    private String jwtSecret;
    @Value("${spring.security.jwt.expirationMs}")
    private int jwtExpirationMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        return doGenerateToken(claims, userDetails.getUsername());
    }
    // genearte JWT Token and attach payload
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .claims(claims) // custome claims
                .subject(subject) // below are standard claims
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))//Token Expiration
                .signWith(getSigningKey())
                .compact();
    }
    // signature verification
    public boolean validateToken(String authToken) {
        try {
            // returns Claims object, which represents the payload of the JWT
            Jwts.parser().verifyWith((SecretKey) getSigningKey()).build().parseSignedClaims(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token format: {}", e.getMessage());
            throw new BadCredentialsException("INVALID_CREDENTIALS", e);
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
            throw e;
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token contains unsupported claims: {}", e.getMessage());
            throw new BadCredentialsException("INVALID_CREDENTIALS", e);
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
            throw new BadCredentialsException("INVALID_CREDENTIALS", e);
        }catch (SignatureException e) {
            logger.error("JWT signature mismatch: {}", e.getMessage());
            throw new BadCredentialsException("INVALID_CREDENTIALS", e);
        }       
    }    
    //extracting username from token
    public String getUsernameFromToken(String token) {
             return     Jwts.parser()
                            .verifyWith((SecretKey) getSigningKey())
                            .build().parseSignedClaims(token)
                            .getPayload()
		                    .getSubject();

	}
}
