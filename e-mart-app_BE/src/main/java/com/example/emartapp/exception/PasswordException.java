package com.example.emartapp.exception;

import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
public class PasswordException extends RuntimeException{
    private final String passwordError;

    public PasswordException(String passwordError) {
        this.passwordError = passwordError;
    }
}
