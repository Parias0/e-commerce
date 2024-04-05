package com.ecommerce.backend.request;
import lombok.Data;

import java.util.List;

@Data
public class CheckoutRequest {
    private List<CheckoutItem> items;
    private Long orderId;

    @Data
    public static class CheckoutItem {
        private Long productId;
        private Integer quantity;

    }
}
