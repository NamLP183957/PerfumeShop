package com.example.emartapp.dto.order;

import com.example.emartapp.dto.perfume.PerfumeResponse;
import lombok.Data;

@Data
public class OrderItemResponse {
    private Long id;
    private Long amount;
    private Long quantity;
    private PerfumeResponse perfumeResponse;

}
