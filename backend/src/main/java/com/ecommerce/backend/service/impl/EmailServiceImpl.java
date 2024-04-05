package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.OrderItem;
import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.service.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@example.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    @Override
    public void sendOrderConfirmationEmail(Order order) {
        String to = order.getUser().getEmail();
        String subject = "Order confirmation no. " + order.getId();

        StringBuilder contentBuilder = new StringBuilder();
        contentBuilder.append("Thank you for placing your order No. ").append(order.getId()).append(".\n\n");
        contentBuilder.append("Order details:\n");

        for (OrderItem item : order.getOrderItems()) {
            contentBuilder.append(item.getProduct().getName())
                    .append(" - Quantity: ")
                    .append(item.getQuantity())
                    .append(", Price: ")
                    .append(item.getUnitPrice())
                    .append(" PLN\n\n");
        }

        contentBuilder.append("\nTotal Amount: ")
                .append(order.getTotalAmount())
                .append(" PLN\n\n");

        Payment payment = order.getPayment();
        if (payment != null) {
            contentBuilder.append("Payment details:\n")
                    .append("Customer Name: ").append(payment.getCustomerName()).append("\n")
                    .append("Customer Email: ").append(payment.getCustomerEmail()).append("\n")
                    .append("Payment Status: ").append(payment.getPaymentStatus()).append("\n\n");
        }

        contentBuilder.append("Thank you for shopping in our shop!");

        sendEmail(to, subject, contentBuilder.toString());
    }


}
