package com.example.emartapp.security.oauth2;

import com.example.emartapp.domain.AuthProvider;
import lombok.SneakyThrows;
import org.springframework.security.oauth2.core.user.OAuth2User;

import javax.naming.AuthenticationException;
import java.util.Map;

public class OAuth2UserFactory {

    @SneakyThrows
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) throws AuthenticationException {
        if (registrationId.equalsIgnoreCase(AuthProvider.FACEBOOK.toString())) {
            return new FacebookOAuth2UserInfo(attributes);
        } else {
            throw new AuthenticationException();
        }
    }
}
