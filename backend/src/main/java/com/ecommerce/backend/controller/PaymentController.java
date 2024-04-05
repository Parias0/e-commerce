package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.request.CheckoutRequest;
import com.ecommerce.backend.response.MessageResponse;
import com.ecommerce.backend.service.OrderService;
import com.ecommerce.backend.service.PaymentService;
import com.ecommerce.backend.service.ProductService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    private final ProductService productService;
    private final PaymentService paymentService;

    private final OrderService orderService;

    public PaymentController(ProductService productService, PaymentService paymentService, OrderService orderService) {
        this.productService = productService;
        this.paymentService = paymentService;
        this.orderService = orderService;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<String> createCheckoutSession(@RequestBody CheckoutRequest checkoutRequest) {
        Stripe.apiKey = stripeApiKey;

        if (checkoutRequest.getOrderId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order ID is missing");
        }

        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();
        for (CheckoutRequest.CheckoutItem item : checkoutRequest.getItems()) {
            Product product = productService.getProductById(item.getProductId());
            lineItems.add(createLineItem(product, item.getQuantity()));
        }

        SessionCreateParams params = SessionCreateParams.builder()
                .addAllLineItem(lineItems)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/success")
                .setCancelUrl("http://localhost:3000/cancel")
                .setClientReferenceId(checkoutRequest.getOrderId().toString())
                .build();

        try {
            Session session = Session.create(params);
            return ResponseEntity.ok(session.getUrl());
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating Stripe Checkout session: " + e.getMessage());
        }
    }


    private SessionCreateParams.LineItem createLineItem(Product product, Integer quantity) {
        return SessionCreateParams.LineItem.builder()
                .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(product.getPrice().longValue() * 100)
                                .setProductData(
                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                .setName(product.getName())
                                                .build())
                                .build())
                .setQuantity(quantity.longValue())
                .build();
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleStripeWebhook(@RequestBody String payload) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(payload);
            JsonNode typeNode = rootNode.get("type");

            if (typeNode != null && "checkout.session.completed".equals(typeNode.asText())) {
                JsonNode objectNode = rootNode.get("data").get("object");

                Double amount = objectNode.get("amount_total").asDouble() / 100.0;
                String currency = objectNode.get("currency").asText();
                long createdTimestamp = objectNode.get("created").asLong();
                LocalDateTime createdDate = LocalDateTime.ofEpochSecond(createdTimestamp, 0, ZoneOffset.UTC);
                String paymentStatus = objectNode.get("payment_status").asText();
                String status = objectNode.get("status").asText();

                JsonNode customerDetailsNode = objectNode.get("customer_details");
                String customerEmail = customerDetailsNode != null ? customerDetailsNode.get("email").asText() : null;
                String customerName = customerDetailsNode != null ? customerDetailsNode.get("name").asText() : null;

                String clientReferenceId = objectNode.get("client_reference_id").asText();
                Long orderId = clientReferenceId != null ? Long.parseLong(clientReferenceId) : null;

                if (orderId != null) {
                    Order order = orderService.findOrderById(orderId);

                    if (order != null) {
                        Payment payment = new Payment();
                        payment.setAmountTotal(amount);
                        payment.setCurrency(currency);
                        payment.setCreated(createdDate);
                        payment.setPaymentStatus(paymentStatus);
                        payment.setStatus(status);
                        payment.setCustomerEmail(customerEmail);
                        payment.setCustomerName(customerName);
                        payment.setOrder(order);

                        paymentService.savePayment(payment);
                    } else {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order not found with id: " + orderId);
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid client_reference_id");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.ok().build();
    }


}

