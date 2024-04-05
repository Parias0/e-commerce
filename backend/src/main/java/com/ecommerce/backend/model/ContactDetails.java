package com.ecommerce.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "contact_details")
public class ContactDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @OneToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    @NotBlank(message = "Mobile phone is required")
    @Pattern(regexp = "^[0-9]{9,15}$", message = "Invalid mobile phone number")
    private String mobilePhone;

}
