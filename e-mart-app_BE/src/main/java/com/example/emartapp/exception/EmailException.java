package com.example.emartapp.exception;

import lombok.Getter;

import javax.validation.constraints.Email;

@Getter
public class EmailException extends RuntimeException{
    private final String emailError;

    public EmailException(String emailError) {
        this.emailError = emailError;
    }
}
