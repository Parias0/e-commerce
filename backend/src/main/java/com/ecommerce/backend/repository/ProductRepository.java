package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByGenreId(Long genreId);

    @Query("SELECT p FROM Product p JOIN p.platforms platform WHERE platform.id = :platformId")
    List<Product> findByPlatformId(Long platformId);
}
