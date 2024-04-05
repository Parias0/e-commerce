package com.ecommerce.backend.controller;

import com.ecommerce.backend.exception.GenreNotFoundException;
import com.ecommerce.backend.exception.PlatformNotFoundException;
import com.ecommerce.backend.exception.ProductException;
import com.ecommerce.backend.model.Genre;
import com.ecommerce.backend.model.Platform;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.response.ConflictResponse;
import com.ecommerce.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ProductService productService;

    public AdminController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product newProduct = productService.addProduct(product);
        return ResponseEntity.ok(newProduct);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) throws ProductException {
        Product updatedProduct = productService.updateProduct(id, productDetails);
        return ResponseEntity.ok(updatedProduct);
    }

    @PostMapping("/genres")
    public ResponseEntity<Genre> addGenre(@RequestBody Genre genre) {
        Genre newGenre = productService.addGenre(genre);
        return ResponseEntity.ok(newGenre);
    }

    @PutMapping("/genres/{id}")
    public ResponseEntity<Genre> updateGenre(@PathVariable Long id, @RequestBody Genre genreDetails) throws GenreNotFoundException {
        Genre updatedGenre = productService.updateGenre(id, genreDetails);
        return ResponseEntity.ok(updatedGenre);
    }

    @DeleteMapping("/genres/{id}")
    public ResponseEntity<?> deleteGenre(@PathVariable Long id) {
        try {
            List<Product> linkedProducts = productService.deleteGenre(id);

            if (!linkedProducts.isEmpty()) {
                List<String> productNames = linkedProducts.stream()
                        .map(Product::getName)
                        .collect(Collectors.toList());
                ConflictResponse response = new ConflictResponse(productNames);
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(response);
            }

            return ResponseEntity.ok().build();
        } catch (GenreNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }



    @PostMapping("/platforms")
    public ResponseEntity<Platform> addPlatform(@RequestBody Platform platform) {
        Platform newPlatform = productService.addPlatform(platform);
        return ResponseEntity.ok(newPlatform);
    }

    @PutMapping("/platforms/{id}")
    public ResponseEntity<Platform> updatePlatform(@PathVariable Long id, @RequestBody Platform platformDetails) throws PlatformNotFoundException {
        Platform updatedPlatform = productService.updatePlatform(id, platformDetails);
        return ResponseEntity.ok(updatedPlatform);
    }

    @DeleteMapping("/platforms/{id}")
    public ResponseEntity<?> deletePlatform(@PathVariable Long id) {
        try {
            List<Product> linkedProducts = productService.deletePlatform(id);

            if (!linkedProducts.isEmpty()) {
                List<String> productNames = linkedProducts.stream()
                        .map(Product::getName)
                        .collect(Collectors.toList());
                ConflictResponse response = new ConflictResponse(productNames);
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(response);
            }

            return ResponseEntity.ok().build();
        } catch (PlatformNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

}
