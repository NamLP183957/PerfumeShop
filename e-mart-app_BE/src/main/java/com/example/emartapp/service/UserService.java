package com.example.emartapp.service;

import com.example.emartapp.domain.Perfume;
import com.example.emartapp.domain.Review;
import com.example.emartapp.domain.User;

import java.util.List;

public interface UserService {
    User findUserByEmail(String email);
    List<Perfume> getCart(List<Long> perfumesIds);
    Perfume addReviewToPerfume(Review review, Long perfumeId);
    User updateUserInfo(String email, User user);
    List<User> getAllUsers();
    User getUserById(Long userId);
}
