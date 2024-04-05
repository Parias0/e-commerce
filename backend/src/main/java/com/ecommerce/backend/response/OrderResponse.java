package com.ecommerce.backend.response;

import com.ecommerce.backend.enums.OrderStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {

    private Long orderId;

    private List<Long> productIds;

    private List<Integer> quantities;

    private BigDecimal totalAmount;

    private LocalDateTime orderDate;

    private OrderStatus status;

    private List<ProductInfo> products;

    private ContactDetailsInfo contactDetails;

    public OrderResponse() {
    }

    public OrderResponse(Long orderId, List<Long> productIds, List<Integer> quantities, BigDecimal totalAmount, LocalDateTime orderDate) {
        this.orderId = orderId;
        this.productIds = productIds;
        this.quantities = quantities;
        this.totalAmount = totalAmount;
        this.orderDate = orderDate;
    }



    @Data
    public static class ProductInfo {

        private Long productId;

        private String productName;

        private Integer quantity;

        private BigDecimal price;
    }

    @Data
    public static class ContactDetailsInfo {

        private String firstName;

        private String lastName;

        private String mobilePhone;
    }

}
