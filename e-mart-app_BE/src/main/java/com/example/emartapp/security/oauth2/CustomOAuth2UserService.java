package com.example.emartapp.security.oauth2;

import com.example.emartapp.domain.User;
import com.example.emartapp.security.UserPrincipal;
import com.example.emartapp.service.AuthenticationService;
import com.example.emartapp.service.UserService;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    public CustomOAuth2UserService(@Lazy AuthenticationService authenticationService,
                                   UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @SneakyThrows
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String provider = userRequest.getClientRegistration().getRegistrationId();
        OAuth2User oAuth2User = super.loadUser(userRequest);
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserFactory.getOAuth2UserInfo(provider, oAuth2User.getAttributes());
        User user = userService.findUserByEmail(oAuth2UserInfo.getEmail());

        if (user == null) {
            user = authenticationService.registerOAuth2User(provider, oAuth2UserInfo);
        } else {
            System.out.println("Update facebook user");
            user = authenticationService.updateOAuth2User(user, provider, oAuth2UserInfo);
        }
        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }
}
