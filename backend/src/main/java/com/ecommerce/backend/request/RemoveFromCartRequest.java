package com.ecommerce.backend.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RemoveFromCartRequest {

    private Long productId;

    private int quantity;

}
