package com.example.emartapp.service;

import com.example.emartapp.domain.Order;

import java.util.List;
import java.util.Map;

public interface OrderService {
    public Order postOder(Order validOrder, Map<Long, Long> perfumeId);

    public List<Order> getOrdersUser(String email);
}
