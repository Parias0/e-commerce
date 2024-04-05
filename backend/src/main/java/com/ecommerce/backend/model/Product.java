package com.ecommerce.backend.model;

import com.ecommerce.backend.enums.ProductStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 80)
    private String name;

    @NotBlank
    @Size(max = 5000)
    private String description;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;


    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "product_platforms",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "platform_id"))
    private Set<Platform> platforms = new HashSet<>();

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int quantity;

    private String image;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;


    public Product(String name, String description, BigDecimal price, Genre genre, int quantity, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.genre = genre;
        this.quantity = quantity;
        this.image = image;
    }

}
