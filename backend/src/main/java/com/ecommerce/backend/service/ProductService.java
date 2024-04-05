package com.ecommerce.backend.service;

import com.ecommerce.backend.exception.GenreNotFoundException;
import com.ecommerce.backend.exception.PlatformNotFoundException;
import com.ecommerce.backend.exception.ProductException;
import com.ecommerce.backend.model.Genre;
import com.ecommerce.backend.model.Platform;
import com.ecommerce.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    Product getProductById(Long productId);

    @Query("SELECT DISTINCT p FROM Product p JOIN FETCH p.platforms")
    Page<Product> findAllProducts(Pageable pageable);

    List<Genre> getAllGenres();

    List<Platform> getAllPlatforms();

    Page<Product> getProductsByFilter(List<Long> platforms, List<Long> genres, BigDecimal maxPrice, Pageable pageable);

    List<Product> searchProductsByName(String name);

    Product addProduct(Product product);

    Product updateProduct(Long productId, Product productDetails) throws ProductException;

    Genre addGenre(Genre genre);

    Genre updateGenre(Long genreId, Genre genreDetails) throws GenreNotFoundException;

    List<Product> deleteGenre(Long genreId) throws GenreNotFoundException;

    Platform addPlatform(Platform platform);

    Platform updatePlatform(Long platformId, Platform platformDetails) throws PlatformNotFoundException;

    List<Product> deletePlatform(Long platformId) throws PlatformNotFoundException;


}
