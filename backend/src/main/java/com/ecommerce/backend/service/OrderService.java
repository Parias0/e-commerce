package com.ecommerce.backend.service;

import com.ecommerce.backend.exception.OrderException;
import com.ecommerce.backend.exception.ProductException;
import com.ecommerce.backend.model.ContactDetails;
import com.ecommerce.backend.model.Order;


import java.util.List;

public interface OrderService {

    Order createOrder(Long userId, List<Long> productIds, List<Integer> quantities, ContactDetails contactDetails) throws ProductException;

    List<Order> getAllOrdersByUserId(Long userId);

    Order findOrderById(Long orderId) throws OrderException;

    Order updateOrder(Order order);
}
