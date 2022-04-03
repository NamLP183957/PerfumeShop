package com.example.emartapp.service.impl;

import com.example.emartapp.domain.Perfume;
import com.example.emartapp.domain.Review;
import com.example.emartapp.domain.User;
import com.example.emartapp.repository.PerfumeRepository;
import com.example.emartapp.repository.ReviewRepository;
import com.example.emartapp.repository.UserRepository;
import com.example.emartapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PerfumeRepository perfumeRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<Perfume> getCart(List<Long> perfumesIds) {
        return perfumeRepository.findByIdIn(perfumesIds);
    }

    @Override
    public User updateUserInfo(String email, User user) {
        System.out.println("email: " + email);
        User userFromDB = userRepository.findByEmail(email);
        userFromDB.setFirstName(user.getFirstName());
        userFromDB.setLastName(user.getLastName());
        userFromDB.setCity(user.getCity());
        userFromDB.setAddress(user.getAddress());
        userFromDB.setPostIndex(user.getPostIndex());
        userFromDB.setPhoneNumber(user.getPhoneNumber());
        userRepository.save(userFromDB);
        return userFromDB;
    }

    @Override
    public Perfume addReviewToPerfume(Review review, Long perfumeId) {
        Perfume perfume = perfumeRepository.findById(perfumeId).get();
        List<Review> reviews = perfume.getReviews();
        reviews.add(review);
        double totalReviews = reviews.size();
        double sumRatings = reviews.stream().mapToInt(Review::getRating).sum();
        perfume.setPerfumeRating(sumRatings / totalReviews);
//        perfumeRepository.save(perfume);
        reviewRepository.save(review);
        return perfume;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).get();
    }
}
