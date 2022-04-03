package com.example.emartapp.mapper;

import com.example.emartapp.domain.Review;
import com.example.emartapp.domain.User;
import com.example.emartapp.dto.RegistrationRequest;
import com.example.emartapp.dto.perfume.PerfumeResponse;
import com.example.emartapp.dto.review.ReviewRequest;
import com.example.emartapp.dto.user.UserRequest;
import com.example.emartapp.dto.user.UserResponse;
import com.example.emartapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final PerfumeMapper perfumeMapper;

//    private final UserService

    User convertToEntity(RegistrationRequest registrationRequest) {
        return modelMapper.map(registrationRequest, User.class);
    }

    User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    UserResponse convertToResponseDto(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

    List<UserResponse> convertToListResponseDto(List<User> users) {
        return users.stream().map(this::convertToResponseDto).collect(Collectors.toList());
    }

    Review convertToEntity(ReviewRequest reviewRequest) {
        return modelMapper.map(reviewRequest, Review.class);
    }

    public List<PerfumeResponse> getCart(List<Long> perfumesIds) {
        return perfumeMapper.convertListToResponseDtos(userService.getCart(perfumesIds));
    }

    public PerfumeResponse addReviewToPerfume(ReviewRequest reviewRequest) {
        return perfumeMapper.convertToResponseDto(userService.addReviewToPerfume(convertToEntity(reviewRequest), reviewRequest.getPerfumeId()));
    }

    public UserResponse getUserInfo(String email) {
        return convertToResponseDto(userService.findUserByEmail(email));
    }

    public UserResponse updateUserInfo(String email, UserRequest userRequest) {
        return convertToResponseDto(userService.updateUserInfo(email, convertToEntity(userRequest)));
    }

    public List<UserResponse> getAllUsers() {
        return convertToListResponseDto(userService.getAllUsers());
    }

    public UserResponse getUserById(Long userId) {
        return convertToResponseDto(userService.getUserById(userId));
    }
}

