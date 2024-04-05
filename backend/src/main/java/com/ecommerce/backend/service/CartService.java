package com.ecommerce.backend.service;
import com.ecommerce.backend.exception.ProductException;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.User;

import java.math.BigDecimal;
import java.util.List;

public interface CartService {

    Cart createCart(User user);

    boolean doesUserHaveCart(Long userId);

    Cart createCartForUser(Long userId);

    Cart addToCart(Long cartId, Long productId, int quantity) throws ProductException;

    Cart removeFromCart(Long cartId, Long productId, int quantity) throws ProductException;

    List<Product> getProductsInCart(String username);

    Cart getCartByUserId(Long userId);

    BigDecimal calculateTotalAmount(Cart cart);

    void clearCart(String username);
}
