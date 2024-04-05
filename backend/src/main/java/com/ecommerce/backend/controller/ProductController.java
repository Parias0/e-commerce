package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Genre;
import com.ecommerce.backend.model.Platform;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/auth/products")
public class ProductController {

    private final ProductService productService;


    public ProductController(ProductService productService) {
        this.productService = productService;

    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        Product product = productService.getProductById(productId);
        return product != null
                ? ResponseEntity.ok(product)
                : ResponseEntity.notFound().build();
    }

    @GetMapping
    public Page<Product> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return productService.findAllProducts(pageable);
    }

    @GetMapping("/genres")
    public ResponseEntity<List<Genre>> getAllGenres() {
        List<Genre> genres = productService.getAllGenres();
        return ResponseEntity.ok(genres);
    }

    @GetMapping("/platforms")
    public ResponseEntity<List<Platform>> getAllPlatforms() {
        List<Platform> platforms = productService.getAllPlatforms();
        return ResponseEntity.ok(platforms);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Product>> getProductsByFilter(
            @RequestParam(required = false) List<Long> platforms,
            @RequestParam(required = false) List<Long> genres,
            @RequestParam(required = false) BigDecimal maxPrice,
            Pageable pageable
    ) {
        Page<Product> filteredProducts = productService.getProductsByFilter(platforms, genres, maxPrice, pageable);
        return ResponseEntity.ok(filteredProducts);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProductsByName(@RequestParam String query) {
        List<Product> products = productService.searchProductsByName(query);
        return ResponseEntity.ok(products);
    }


}
