package com.example.emartapp.controller;

import com.example.emartapp.dto.perfume.PerfumeRequest;
import com.example.emartapp.dto.perfume.PerfumeResponse;
import com.example.emartapp.dto.user.UserRequest;
import com.example.emartapp.exception.InputFieldException;
import com.example.emartapp.mapper.OrderMapper;
import com.example.emartapp.mapper.PerfumeMapper;
import com.example.emartapp.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping("api/v1/admin")
public class AdminController {
    private final PerfumeMapper perfumeMapper;
    private final UserMapper userMapper;
    private final OrderMapper orderMapper;

    @PostMapping("/add")
    public ResponseEntity<Object> addPerfume(@RequestPart(name = "file", required = false)MultipartFile file,
                                             @RequestPart("perfume") @Valid PerfumeRequest perfumeRequest,
                                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            if (perfumeRequest == null) {
                return ResponseEntity.ok("Perfume null");
            } else if (file == null) {
                return ResponseEntity.ok("file null");
            } else {
                System.out.println("perfume: " + perfumeRequest.toString());
                PerfumeResponse response = perfumeMapper.savePerfume(perfumeRequest, file);
                return ResponseEntity.ok(response);
            }
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updatePerfume(@RequestPart(name = "file", required = false) MultipartFile file,
                                                @RequestPart(name = "perfume") @Valid PerfumeRequest perfumeRequest,
                                                BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(perfumeMapper.updatePerfume(perfumeRequest, file));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deletePerfume(@PathVariable("id") Long id) {
        return ResponseEntity.ok(perfumeMapper.deletePerfume(id));
    }

    @GetMapping("/users/all")
    public ResponseEntity<Object> getAllUsers() {
        return ResponseEntity.ok(userMapper.getAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userMapper.getUserById(id));
    }

    @PostMapping("/orders")
    public ResponseEntity<Object> getOrderUser(@RequestBody UserRequest user) {
        return ResponseEntity.ok(orderMapper.getOrdersByUser(user.getEmail()));
    }
}
