package com.example.emartapp.service.impl;

import com.example.emartapp.domain.Order;
import com.example.emartapp.domain.OrderItem;
import com.example.emartapp.domain.Perfume;
import com.example.emartapp.repository.OrderItemRepository;
import com.example.emartapp.repository.OrderRepository;
import com.example.emartapp.repository.PerfumeRepository;
import com.example.emartapp.service.OrderService;
import com.example.emartapp.service.email.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final PerfumeRepository perfumeRepository;
    private final MailSender mailSender;

    @Override
    public List<Order> getOrdersUser(String email) {
        return orderRepository.findOrdersByEmail(email);
    }

    @Override
    public Order postOder(Order validOrder, Map<Long, Long> perfumeId) {
        Order order = new Order();
        List<OrderItem> orderItems = new ArrayList<>();

        for (Map.Entry<Long, Long> entry : perfumeId.entrySet()) {
            Perfume perfume = perfumeRepository.findById(entry.getKey()).get();
            OrderItem orderItem = new OrderItem();
            orderItem.setPerfume(perfume);
            orderItem.setQuantity(entry.getValue());
            orderItem.setAmount(perfume.getPrice() * entry.getValue());
            orderItems.add(orderItem);
            orderItemRepository.save(orderItem);
        }

        order.getOrderItems().addAll(orderItems);
        order.setTotalPrice(validOrder.getTotalPrice());
        order.setFirstName(validOrder.getFirstName());
        order.setLastName(validOrder.getLastName());
        order.setCity(validOrder.getCity());
        order.setAddress(validOrder.getAddress());
        order.setPostIndex(validOrder.getPostIndex());
        order.setEmail(validOrder.getEmail());
        order.setPhoneNumber(validOrder.getPhoneNumber());
        orderRepository.save(order);

        String subject = "Order #" + order.getId();
        String template = "order-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("order", order);
        mailSender.sendMessageHtml(order.getEmail(), subject, template, attributes);
        return order;
    }
}
