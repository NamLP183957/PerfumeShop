package com.example.emartapp.mapper;

import com.example.emartapp.domain.Order;
import com.example.emartapp.dto.order.OrderRequest;
import com.example.emartapp.dto.order.OrderResponse;
import com.example.emartapp.repository.OrderRepository;
import com.example.emartapp.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    private final OrderService orderService;
    private final ModelMapper modelMapper;

    private Order convertToEntity(OrderRequest orderRequest) {
        return modelMapper.map(orderRequest, Order.class);
    }

    private OrderResponse convertToResponseDto(Order order) {
        return modelMapper.map(order, OrderResponse.class);
    }

    private List<OrderResponse> convertToListResponseDto(List<Order> orders) {
        return orders.stream().map(this::convertToResponseDto).collect(Collectors.toList());
    }

    public OrderResponse postOrder(OrderRequest request) {
        return convertToResponseDto(orderService.postOder(convertToEntity(request), request.getPerfumeId()));
    }

    public List<OrderResponse> getOrdersByUser(String email) {
        return convertToListResponseDto(orderService.getOrdersUser(email));
    }
}
