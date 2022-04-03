package com.example.emartapp.service;

import com.example.emartapp.domain.User;
import com.example.emartapp.security.oauth2.OAuth2UserInfo;

import java.util.Map;

public interface AuthenticationService{

    Map<String, String> login(String email, String password);

    String registerUser(User user, String captcha, String password2);

    User registerOAuth2User(String provider, OAuth2UserInfo oAuth2UserInfo);

    User updateOAuth2User(User user, String provider, OAuth2UserInfo oAuth2UserInfo);

    String activateUser(String code);

    User findByPasswordResetCode(String code);

    String sendPasswordResetCode(String email);

    String passwordReset(String email, String password, String password2);
}
