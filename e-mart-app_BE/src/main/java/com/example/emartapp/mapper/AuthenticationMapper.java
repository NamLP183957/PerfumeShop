package com.example.emartapp.mapper;

import com.example.emartapp.dto.RegistrationRequest;
import com.example.emartapp.dto.auth.AuthenticationRequest;
import com.example.emartapp.dto.auth.AuthenticationResponse;
import com.example.emartapp.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {
    private final AuthenticationService authenticationService;
    private final UserMapper userMapper;

    public String registerUser(RegistrationRequest registrationRequest){
        return authenticationService.registerUser(userMapper.convertToEntity(registrationRequest), "***", registrationRequest.getPassword2());
    }

    public String activationUser(String code) {
        return authenticationService.activateUser(code);
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        Map<String, String> credentials = authenticationService.login(request.getEmail(), request.getPassword());
        AuthenticationResponse response = new AuthenticationResponse();
        response.setEmail(credentials.get("email"));
        response.setToken(credentials.get("token"));
        response.setUserRole(credentials.get("userRole"));
        return response;
    }
}
