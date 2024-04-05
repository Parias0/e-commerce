package com.ecommerce.backend.controller;

import com.ecommerce.backend.enums.ERole;
import com.ecommerce.backend.model.PasswordResetToken;
import com.ecommerce.backend.model.Role;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.PasswordResetTokenRepository;
import com.ecommerce.backend.repository.RoleRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.request.LoginRequest;
import com.ecommerce.backend.request.SignupRequest;
import com.ecommerce.backend.response.JwtResponse;
import com.ecommerce.backend.response.MessageResponse;
import com.ecommerce.backend.security.JwtUtils;
import com.ecommerce.backend.service.CartService;
import com.ecommerce.backend.service.PasswordResetService;
import com.ecommerce.backend.service.impl.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    final AuthenticationManager authenticationManager;
    final UserRepository userRepository;
    final RoleRepository roleRepository;
    final PasswordEncoder encoder;
    final JwtUtils jwtUtils;
    final CartService cartService;
    final PasswordResetService passwordResetService;
    final PasswordResetTokenRepository passwordResetTokenRepository;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils, CartService cartService, PasswordResetService passwordResetService, PasswordResetTokenRepository passwordResetTokenRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.cartService = cartService;
        this.passwordResetService = passwordResetService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateTokenFromUsername(loginRequest.getUsername());

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        Long userId = userDetails.getId();
        if (!cartService.doesUserHaveCart(userId)) {
            cartService.createCartForUser(userId);
        }

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if (role.equals("admin")) {
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                } else {
                    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
                }
            });
        }
        user.setCreatedAt(LocalDateTime.now());
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/request-password-reset")
    public ResponseEntity<?> requestPasswordReset(@RequestParam("email") String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email address not found."));
        }

        User user = userOptional.get();
        passwordResetService.generateResetToken(user);
        return ResponseEntity.ok(new MessageResponse("Password reset link sent to email."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token).orElse(null);
        if (resetToken == null || !passwordResetService.validateResetToken(token)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid or expired reset token."));
        }

        User user = resetToken.getUser();
        passwordResetService.resetPassword(user, newPassword);
        return ResponseEntity.ok(new MessageResponse("Password reset successfully."));
    }

}
