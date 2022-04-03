package com.example.emartapp.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    public String uploadFile(MultipartFile file);
    public Object readFile(String fileName);
}
