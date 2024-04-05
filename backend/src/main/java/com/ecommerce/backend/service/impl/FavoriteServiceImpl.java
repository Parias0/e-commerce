package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.exception.ProductException;
import com.ecommerce.backend.model.Favorite;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.FavoriteRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.response.FavoriteProductResponse;
import com.ecommerce.backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    @Autowired
    public FavoriteServiceImpl(FavoriteRepository favoriteRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public List<FavoriteProductResponse> getFavoritesByUserId(Long userId) {
        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        return favorites.stream().map(favorite -> {
            FavoriteProductResponse dto = new FavoriteProductResponse();
            dto.setFavoriteId(favorite.getId());
            dto.setProductId(favorite.getProduct().getId());
            dto.setProductName(favorite.getProduct().getName());
            dto.setProductImage(favorite.getProduct().getImage());
            dto.setProductPrice(favorite.getProduct().getPrice());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void toggleFavorite(Long userId, Long productId) throws ProductException {
        Optional<Favorite> existingFavorite = favoriteRepository.findByUserIdAndProductId(userId, productId);
        if (existingFavorite.isPresent()) {

            favoriteRepository.deleteById(existingFavorite.get().getId());
        } else {

            Favorite favorite = new Favorite();
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            Product product = productRepository.findById(productId).orElseThrow(() -> new ProductException("Product not found"));

            favorite.setUser(user);
            favorite.setProduct(product);

            favoriteRepository.save(favorite);
        }
    }

}
