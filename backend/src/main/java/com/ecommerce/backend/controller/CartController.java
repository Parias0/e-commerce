package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.request.AddToCartRequest;
import com.ecommerce.backend.request.RemoveFromCartRequest;
import com.ecommerce.backend.response.MessageResponse;
import com.ecommerce.backend.security.JwtUtils;
import com.ecommerce.backend.service.CartService;
import com.ecommerce.backend.service.impl.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    private final JwtUtils jwtUtils;

    private final UserDetailsServiceImpl userDetailsService;

    public CartController(CartService cartService, JwtUtils jwtUtils, UserDetailsServiceImpl userDetailsService) {
        this.cartService = cartService;
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    private String getUsernameFromAuthorizationHeader(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            String jwt = headerAuth.substring(7);
            return jwtUtils.getUserNameFromJwtToken(jwt);
        }
        return null;
    }

    @PostMapping("/add-product")
    public ResponseEntity<?> addProductToCart(@RequestBody AddToCartRequest addToCartRequest, HttpServletRequest request) {
        try {
            Long productId = addToCartRequest.getProductId();
            int quantity = addToCartRequest.getQuantity();

            String username = getUsernameFromAuthorizationHeader(request);

            Long userId = userDetailsService.getUserIdByUsername(username);
            cartService.addToCart(userId, productId, quantity);

            return ResponseEntity.ok(new MessageResponse("Product added to the cart successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/remove-product")
    public ResponseEntity<?> removeProductFromCart(@RequestBody RemoveFromCartRequest removeFromCartRequest, HttpServletRequest request) {
        try {
            Long productId = removeFromCartRequest.getProductId();
            int quantity = removeFromCartRequest.getQuantity();

            String username = getUsernameFromAuthorizationHeader(request);

            Long userId = userDetailsService.getUserIdByUsername(username);
            cartService.removeFromCart(userId, productId, quantity);

            return ResponseEntity.ok(new MessageResponse("Product removed from the cart successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/clear-cart")
    public ResponseEntity<?> clearCart(HttpServletRequest request) {
        try {
            String username = getUsernameFromAuthorizationHeader(request);

            cartService.clearCart(username);

            return ResponseEntity.ok(new MessageResponse("Cart cleared successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProductsInCart(HttpServletRequest request) {
        try {
            String username = getUsernameFromAuthorizationHeader(request);

            List<Product> productsInCart = cartService.getProductsInCart(username);

            return ResponseEntity.ok(productsInCart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @GetMapping("/total-amount")
    public ResponseEntity<?> getTotalCartAmount(HttpServletRequest request) {
        try {
            String username = getUsernameFromAuthorizationHeader(request);
            Long userId = userDetailsService.getUserIdByUsername(username);
            Cart cart = cartService.getCartByUserId(userId);
            BigDecimal totalAmount = cartService.calculateTotalAmount(cart);

            return ResponseEntity.ok(totalAmount);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

}
