package com.ecommerce.backend.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class FavoriteProductResponse {

    private Long favoriteId;
    private Long productId;
    private String productName;
    private String productImage;
    private BigDecimal productPrice;

    public FavoriteProductResponse() {
    }
}
