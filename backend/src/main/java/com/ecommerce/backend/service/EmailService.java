package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Order;

public interface EmailService {
    void sendEmail(String to, String subject, String content);
    void sendOrderConfirmationEmail(Order order);
}
