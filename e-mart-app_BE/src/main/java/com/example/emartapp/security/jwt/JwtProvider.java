package com.example.emartapp.security.jwt;

import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public interface JwtProvider {
    public String createToken(String username, String role);
    public boolean validateToken(String token) throws JwtAuthenticationException;
    public Authentication getAuthentication(String token);
    public String getUsername(String token);
    public String resolveToken(HttpServletRequest request);
}
