package com.example.emartapp.exception;

import lombok.Getter;

@Getter
public class FileException extends RuntimeException{
    private final String fileError;

    public FileException(String fileError) {
        this.fileError = fileError;
    }
}
