package com.ecommerce.backend.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;


import java.util.List;

@Getter
@Setter
public class CreateOrderRequest {

    @NotEmpty(message = "Product IDs cannot be empty")
    private List<Long> productIds;

    @NotEmpty(message = "Quantities cannot be empty")
    private List<Integer> quantities;

    private String firstName;

    private String lastName;

    private String mobilePhone;

}
