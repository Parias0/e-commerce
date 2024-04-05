package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.ContactDetails;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.request.CreateOrderRequest;
import com.ecommerce.backend.response.MessageResponse;
import com.ecommerce.backend.response.OrderResponse;
import com.ecommerce.backend.security.JwtUtils;
import com.ecommerce.backend.service.OrderService;
import com.ecommerce.backend.service.impl.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;


    public OrderController(OrderService orderService, JwtUtils jwtUtils, UserDetailsServiceImpl userDetailsService) {
        this.orderService = orderService;
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


    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest createOrderRequest, HttpServletRequest request) {
        try {
            String username = getUsernameFromAuthorizationHeader(request);
            Long userId = userDetailsService.getUserIdByUsername(username);

            ContactDetails contactDetails = new ContactDetails();
            contactDetails.setFirstName(createOrderRequest.getFirstName());
            contactDetails.setLastName(createOrderRequest.getLastName());
            contactDetails.setMobilePhone(createOrderRequest.getMobilePhone());

            Order createdOrder = orderService.createOrder(userId, createOrderRequest.getProductIds(), createOrderRequest.getQuantities(), contactDetails);

            OrderResponse orderResponse = new OrderResponse(
                    createdOrder.getId(),
                    createOrderRequest.getProductIds(),
                    createOrderRequest.getQuantities(),
                    createdOrder.getTotalAmount(),
                    createdOrder.getOrderDate()
            );

            return ResponseEntity.ok(orderResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllOrders(HttpServletRequest request) {
        try {
            String username = getUsernameFromAuthorizationHeader(request);
            Long userId = userDetailsService.getUserIdByUsername(username);

            List<Order> userOrders = orderService.getAllOrdersByUserId(userId);

            List<OrderResponse> orderResponses = userOrders.stream().map(order -> {
                OrderResponse response = new OrderResponse();
                response.setOrderId(order.getId());
                response.setTotalAmount(order.getTotalAmount());
                response.setOrderDate(order.getOrderDate());
                response.setStatus(order.getStatus());

                List<OrderResponse.ProductInfo> productInfos = order.getOrderItems().stream().map(item -> {
                    OrderResponse.ProductInfo info = new OrderResponse.ProductInfo();
                    info.setProductId(item.getProduct().getId());
                    info.setProductName(item.getProduct().getName());
                    info.setQuantity(item.getQuantity());
                    info.setPrice(item.getProduct().getPrice());
                    return info;
                }).collect(Collectors.toList());
                response.setProducts(productInfos);

                OrderResponse.ContactDetailsInfo contactDetailsInfo = new OrderResponse.ContactDetailsInfo();
                ContactDetails contactDetails = order.getContactDetails();
                contactDetailsInfo.setFirstName(contactDetails.getFirstName());
                contactDetailsInfo.setLastName(contactDetails.getLastName());
                contactDetailsInfo.setMobilePhone(contactDetails.getMobilePhone());
                response.setContactDetails(contactDetailsInfo);

                return response;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(orderResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @GetMapping("/find/{orderId}")
    public ResponseEntity<?> findOrderById(@PathVariable Long orderId) {
        try {
            Order order = orderService.findOrderById(orderId);
            if (order != null) {
                // Zwracanie szczegółów zamówienia
                return ResponseEntity.ok(order);
            } else {
                // Zwracanie błędu, jeśli zamówienie nie zostanie znalezione
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Order not found with id: " + orderId));
            }
        } catch (Exception e) {
            // Obsługa innych wyjątków
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}

