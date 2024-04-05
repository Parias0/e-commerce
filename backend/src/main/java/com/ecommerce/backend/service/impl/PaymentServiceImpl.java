package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.enums.OrderStatus;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.Payment;
import com.ecommerce.backend.repository.PaymentRepository;
import com.ecommerce.backend.service.EmailService;
import com.ecommerce.backend.service.OrderService;
import com.ecommerce.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderService orderService;
    private final EmailService emailService;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository, OrderService orderService, EmailService emailService) {
        this.paymentRepository = paymentRepository;
        this.orderService = orderService;
        this.emailService = emailService;
    }

    @Override
    public Payment savePayment(Payment payment) {
        Payment savedPayment = paymentRepository.save(payment);

        if (savedPayment.getOrder() != null) {
            Order order = savedPayment.getOrder();
            order.setStatus(OrderStatus.PAID);

            orderService.updateOrder(order);

            emailService.sendOrderConfirmationEmail(order);
        }

        return savedPayment;
    }


}
