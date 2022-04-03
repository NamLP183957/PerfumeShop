package com.example.emartapp.controller;

import com.example.emartapp.dto.order.OrderRequest;
import com.example.emartapp.dto.perfume.PerfumeRequest;
import com.example.emartapp.dto.perfume.PerfumeResponse;
import com.example.emartapp.dto.review.ReviewRequest;
import com.example.emartapp.dto.user.UserRequest;
import com.example.emartapp.exception.InputFieldException;
import com.example.emartapp.mapper.OrderMapper;
import com.example.emartapp.mapper.UserMapper;
import com.example.emartapp.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserMapper userMapper;
    private final SimpMessagingTemplate messagingTemplate;
    private final OrderMapper orderMapper;

    @GetMapping("/info")
    public ResponseEntity<Object> getUserInfo(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(userMapper.getUserInfo(user.getEmail()));
    }

    @PostMapping("/cart")
    public ResponseEntity<Object> getCart(@RequestBody List<Long> perfumesIds) {
        return ResponseEntity.ok(userMapper.getCart(perfumesIds));
    }

    @PostMapping("/review")
    public ResponseEntity<Object> addReviewToPerfume(@Valid @RequestBody ReviewRequest reviewRequest,
                                                     BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            PerfumeResponse perfume = userMapper.addReviewToPerfume(reviewRequest);
            messagingTemplate.convertAndSend("/topic/reviews/" + perfume.getId(), perfume);
            return ResponseEntity.ok(perfume);
        }
    }

    @PostMapping("/order")
    public ResponseEntity<Object> postOrder(@Valid @RequestBody OrderRequest request,
                                            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(orderMapper.postOrder(request));
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<Object> updateUserInfo(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                 @Valid @RequestBody UserRequest userRequest,
                                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        } else {
            return ResponseEntity.ok(userMapper.updateUserInfo(userPrincipal.getEmail(), userRequest));
        }
    }
}
