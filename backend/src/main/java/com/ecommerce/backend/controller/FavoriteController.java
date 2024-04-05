package com.ecommerce.backend.controller;

import com.ecommerce.backend.exception.ProductException;
import com.ecommerce.backend.response.FavoriteProductResponse;
import com.ecommerce.backend.response.MessageResponse;
import com.ecommerce.backend.security.JwtUtils;
import com.ecommerce.backend.service.FavoriteService;
import com.ecommerce.backend.service.impl.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    public FavoriteController(FavoriteService favoriteService, JwtUtils jwtUtils, UserDetailsServiceImpl userDetailsService) {
        this.favoriteService = favoriteService;
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    private String getUsernameFromAuthorizationHeader(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            String jwt = headerAuth.substring(7);
            return jwtUtils.getUserNameFromJwtToken(jwt);
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<?> getUserFavorites(HttpServletRequest request) {
        String username = getUsernameFromAuthorizationHeader(request);
        Long userId = userDetailsService.getUserIdByUsername(username);
        List<FavoriteProductResponse> favorites = favoriteService.getFavoritesByUserId(userId);
        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/toggle")
    public ResponseEntity<?> toggleFavorite(@RequestParam Long productId, HttpServletRequest request) throws ProductException {
        String username = getUsernameFromAuthorizationHeader(request);
        Long userId = userDetailsService.getUserIdByUsername(username);
        favoriteService.toggleFavorite(userId, productId);
        return ResponseEntity.ok(new MessageResponse("Favorite toggled successfully"));
    }
}
