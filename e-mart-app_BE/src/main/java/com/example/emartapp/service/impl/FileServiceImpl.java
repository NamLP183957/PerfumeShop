package com.example.emartapp.service.impl;

import com.example.emartapp.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {
    private static String uploadDirectory = System.getProperty("user.dir") + "/uploads";

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            String filePath = Paths.get(uploadDirectory, fileName).toString();
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
            stream.write(file.getBytes());
            stream.close();
            return "http://localhost:8080/file/" + fileName;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "null";
    }

    @Override
    public Object readFile(String fileName) {
        return null;
    }


}
