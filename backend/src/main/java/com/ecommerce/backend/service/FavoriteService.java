package com.ecommerce.backend.service;

import com.ecommerce.backend.exception.ProductException;
import com.ecommerce.backend.response.FavoriteProductResponse;

import java.util.List;

public interface FavoriteService {
    List<FavoriteProductResponse> getFavoritesByUserId(Long userId);
    void toggleFavorite(Long userId, Long productId) throws ProductException;

}
