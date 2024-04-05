package com.ecommerce.backend.model;

import com.ecommerce.backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    @Column(precision = 10, scale = 2)
    private BigDecimal totalAmount;

    private LocalDateTime orderDate;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_details_id")
    private ContactDetails contactDetails;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Payment payment;



    public Order(User user, List<OrderItem> orderItems, BigDecimal totalAmount, LocalDateTime orderDate, ContactDetails contactDetails, OrderStatus status, Payment payment) {
        this.user = user;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount;
        this.orderDate = orderDate;
        this.contactDetails = contactDetails;
        this.status = status;
        this.payment = payment;
    }
}
