package com.example.emartapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

@RestController
@RequestMapping("file")
@RequiredArgsConstructor
public class FileController {
    private static MediaType getMediaTypForFileName(ServletContext context, String fileName) {
        String mimeType = context.getMimeType(fileName);
        try {
            MediaType mediaType = MediaType.parseMediaType(mimeType);
            return mediaType;
        } catch (Exception e) {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }

    private final ServletContext servletContext;

    @GetMapping("/{filename}")
    public ResponseEntity<Object> getFile(@PathVariable(value = "filename")String fileName) {
        MediaType mediaType = getMediaTypForFileName(this.servletContext, fileName);
        File file = new File("uploads/" + fileName);
        InputStreamResource resource = null;
        try {
            resource = new InputStreamResource(new FileInputStream(file));
            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .contentLength(file.length())
                    .body(resource);
        } catch (FileNotFoundException e) {
            return ResponseEntity.status(500).body(e);
        }
    }
}
