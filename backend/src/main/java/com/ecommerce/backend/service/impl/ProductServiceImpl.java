package com.ecommerce.backend.service.impl;


import com.ecommerce.backend.exception.GenreNotFoundException;
import com.ecommerce.backend.exception.PlatformNotFoundException;
import com.ecommerce.backend.exception.ProductException;
import com.ecommerce.backend.model.Genre;
import com.ecommerce.backend.model.Platform;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.GenreRepository;
import com.ecommerce.backend.repository.PlatformRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.service.ProductService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final GenreRepository genreRepository;
    private final PlatformRepository platformRepository;

    public ProductServiceImpl(ProductRepository productRepository, GenreRepository genreRepository, PlatformRepository platformRepository) {
        this.productRepository = productRepository;
        this.genreRepository = genreRepository;
        this.platformRepository = platformRepository;
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    @Override
    public Page<Product> findAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    @Override
    public List<Platform> getAllPlatforms() {
        return platformRepository.findAll();
    }

    @Override
    public Page<Product> getProductsByFilter(List<Long> platformIds, List<Long> genreIds, BigDecimal maxPrice, Pageable pageable) {
        Specification<Product> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (platformIds != null && !platformIds.isEmpty()) {
                predicates.add(root.join("platforms").get("id").in(platformIds));
            }

            if (genreIds != null && !genreIds.isEmpty()) {
                predicates.add(root.get("genre").get("id").in(genreIds));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return productRepository.findAll(spec, pageable);
    }

    @Override
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }


    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long productId, Product productDetails) throws ProductException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("Product not found for this id :: " + productId));


        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setGenre(productDetails.getGenre());
        Set<Platform> updatedPlatforms = new HashSet<>();
        for (Long platformId : productDetails.getPlatforms().stream().map(Platform::getId).collect(Collectors.toSet())) {
            Platform platform = platformRepository.findById(platformId)
                    .orElseThrow(() -> new RuntimeException("Platform not found for this id :: " + platformId));
            updatedPlatforms.add(platform);
        }
        product.setPlatforms(updatedPlatforms);
        product.setQuantity(productDetails.getQuantity());
        product.setImage(productDetails.getImage());
        product.setStatus(productDetails.getStatus());

        return productRepository.save(product);
    }

    @Override
    public Genre addGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    @Override
    public Genre updateGenre(Long genreId, Genre genreDetails) throws GenreNotFoundException {
        Genre genre = genreRepository.findById(genreId)
                .orElseThrow(() -> new GenreNotFoundException("Genre not found for this id :: " + genreId));

        genre.setName(genreDetails.getName());
        return genreRepository.save(genre);
    }

    @Override
    public List<Product> deleteGenre(Long genreId) throws GenreNotFoundException {
        Genre genre = genreRepository.findById(genreId)
                .orElseThrow(() -> new GenreNotFoundException("Genre not found for this id :: " + genreId));

        List<Product> linkedProducts = productRepository.findByGenreId(genreId);
        if (!linkedProducts.isEmpty()) {
            return linkedProducts;
        }

        genreRepository.delete(genre);
        return Collections.emptyList(); // Pusta lista oznacza, że gatunek został usunięty
    }


    @Override
    public Platform addPlatform(Platform platform) {
        return platformRepository.save(platform);
    }

    @Override
    public Platform updatePlatform(Long platformId, Platform platformDetails) throws PlatformNotFoundException {
        Platform platform = platformRepository.findById(platformId)
                .orElseThrow(() -> new PlatformNotFoundException("Platform not found for this id :: " + platformId));

        platform.setName(platformDetails.getName());
        // Możesz dodać więcej pól, jeśli istnieją
        return platformRepository.save(platform);
    }

    @Override
    public List<Product> deletePlatform(Long platformId) throws PlatformNotFoundException {
        Platform platform = platformRepository.findById(platformId)
                .orElseThrow(() -> new PlatformNotFoundException("Platform not found for this id :: " + platformId));

        List<Product> linkedProducts = productRepository.findByPlatformId(platformId);
        if (!linkedProducts.isEmpty()) {
            return linkedProducts;
        }

        platformRepository.delete(platform);
        return Collections.emptyList(); // Pusta lista oznacza, że platforma została usunięta
    }



}
