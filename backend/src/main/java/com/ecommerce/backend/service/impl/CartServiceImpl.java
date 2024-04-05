package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.exception.ProductException;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.CartRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.service.CartService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    public CartServiceImpl(CartRepository cartRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart(user, new ArrayList<>(), BigDecimal.ZERO);
        return cartRepository.save(cart);
    }

    @Override
    public boolean doesUserHaveCart(Long userId) {
        return cartRepository.findByUserId(userId).isPresent();
    }

    @Override
    public Cart createCartForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        return createCart(user);
    }

    @Override
    public Cart addToCart(Long userId, Long productId, int quantity) throws ProductException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createCart(user));

        Product product = getProductById(productId);

        List<Product> productsInCart = cart.getProducts();

        Optional<Product> existingProduct = productsInCart.stream()
                .filter(p -> p.getId().equals(product.getId()))
                .findFirst();

        if (existingProduct.isPresent()) {
            Product existing = existingProduct.get();
            existing.setQuantity(existing.getQuantity() + quantity);
        } else {
            product.setQuantity(quantity);
            productsInCart.add(product);
        }

        cart.setProducts(productsInCart);
        cart.setTotalAmount(calculateTotalAmount(cart));

        return cartRepository.save(cart);
    }

    @Override
    public Cart removeFromCart(Long userId, Long productId, int quantity) throws ProductException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createCart(user));
        Product product = getProductById(productId);

        List<Product> productsInCart = cart.getProducts();

        Optional<Product> existingProduct = productsInCart.stream()
                .filter(p -> p.getId().equals(product.getId()))
                .findFirst();

        if (existingProduct.isPresent()) {
            Product existing = existingProduct.get();

            int newQuantity = existing.getQuantity() - quantity;
            if (newQuantity <= 0) {
                productsInCart.remove(existing);
            } else {
                existing.setQuantity(newQuantity);
            }

            cart.setProducts(productsInCart);
            cart.setTotalAmount(calculateTotalAmount(cart));

            return cartRepository.save(cart);
        }

        return cart;
    }

    @Override
    public BigDecimal calculateTotalAmount(Cart cart) {
        List<Product> products = cart.getProducts();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (Product product : products) {
            BigDecimal productPrice = product.getPrice();
            int quantity = product.getQuantity();
            totalAmount = totalAmount.add(productPrice.multiply(BigDecimal.valueOf(quantity)));
        }

        return totalAmount;
    }

        @Override
        public void clearCart(String username) {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

            Cart cart = cartRepository.findByUser(user)
                    .orElseThrow(() -> new RuntimeException("Cart not found for user: " + username));

            cart.setProducts(new ArrayList<>());
            cart.setTotalAmount(BigDecimal.ZERO);

            cartRepository.save(cart);
        }

    @Override
    public List<Product> getProductsInCart(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found for user: " + username));

        return cart.getProducts();
    }

    private Product getProductById(Long productId) throws ProductException {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("Product not found with id: " + productId));
    }

    @Override
    public Cart getCartByUserId(Long userId) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        return optionalCart.orElseGet(() -> createCart(userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId))));
    }
}
