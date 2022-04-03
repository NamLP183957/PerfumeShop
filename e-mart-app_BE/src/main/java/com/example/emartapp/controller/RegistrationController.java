package com.example.emartapp.controller;

import com.example.emartapp.dto.RegistrationRequest;
import com.example.emartapp.mapper.AuthenticationMapper;
import com.example.emartapp.exception.InputFieldException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/registration")
public class RegistrationController {
    private final AuthenticationMapper authenticationMapper;

    @PostMapping
    public ResponseEntity<Object> registrationUser(@Valid @RequestBody RegistrationRequest registrationRequest,
                                                   BindingResult bindingResult) { // Tham so nay dung de neu validate khong thanh cong thi se xu ly thu cong
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        return ResponseEntity.ok(authenticationMapper.registerUser(registrationRequest));
    }

    @GetMapping("/activate/{code}")
    public ResponseEntity<String> activateEmailCode(@PathVariable String code) {
        return ResponseEntity.ok(authenticationMapper.activationUser(code));
    }
}
