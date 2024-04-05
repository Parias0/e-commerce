package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.enums.OrderStatus;
import com.ecommerce.backend.exception.OrderException;
import com.ecommerce.backend.exception.ProductException;
import com.ecommerce.backend.model.*;
import com.ecommerce.backend.repository.*;
import com.ecommerce.backend.service.CartService;
import com.ecommerce.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {


    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartService cartService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ContactDetailsRepository contactDetailsRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository, CartService cartService, UserRepository userRepository, ProductRepository productRepository, ContactDetailsRepository contactDetailsRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartService = cartService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.contactDetailsRepository = contactDetailsRepository;
    }

    @Override
    public Order createOrder(Long userId, List<Long> productIds, List<Integer> quantities, ContactDetails contactDetails) throws ProductException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId));

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING_PAYMENT);

        order.setContactDetails(contactDetails);
        contactDetails.setOrder(order);

        order = orderRepository.save(order);

        contactDetailsRepository.save(contactDetails);

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (int i = 0; i < productIds.size(); i++) {
            Long productId = productIds.get(i);
            int quantity = quantities.get(i);

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ProductException("Product not found with ID: " + productId));
            if (product.getQuantity() < quantity) {
                throw new RuntimeException("Not enough quantity for product with ID: " + productId);
            }

            BigDecimal unitPrice = product.getPrice();
            BigDecimal amountForItem = unitPrice.multiply(BigDecimal.valueOf(quantity));
            totalAmount = totalAmount.add(amountForItem);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(quantity);
            orderItem.setUnitPrice(unitPrice);
            orderItemRepository.save(orderItem);
        }

        order.setTotalAmount(totalAmount);
        orderRepository.save(order);

        for (int i = 0; i < productIds.size(); i++) {
            Long productId = productIds.get(i);
            int quantity = quantities.get(i);

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ProductException("Product not found with ID: " + productId));
            product.setQuantity(product.getQuantity() - quantity);
            productRepository.save(product);
        }

        cartService.clearCart(user.getUsername());

        return order;
    }

    @Override
    public List<Order> getAllOrdersByUserId(Long userId) {
        return orderRepository.findAllByUserId(userId);
    }

    @Override
    public Order findOrderById(Long orderId) throws OrderException {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderException("Order not found with id: " + orderId));
    }

    @Override
    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }
}
