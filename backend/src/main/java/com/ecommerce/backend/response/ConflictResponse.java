package com.ecommerce.backend.response;

import java.util.List;

public class ConflictResponse {
    private List<String> productNames;

    public ConflictResponse(List<String> productNames) {
        this.productNames = productNames;
    }

    // Gettery i settery
    public List<String> getProductNames() {
        return productNames;
    }

    public void setProductNames(List<String> productNames) {
        this.productNames = productNames;
    }
}

