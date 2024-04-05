package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.User;
import com.ecommerce.backend.response.UserInfoResponse;
import com.ecommerce.backend.service.impl.UserDetailsServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    private final UserDetailsServiceImpl userDetailsService;

    public AccountController(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User user = userDetailsService.findUserByUsername(currentUserName);

        UserInfoResponse userInfo = new UserInfoResponse();
        userInfo.setUsername(user.getUsername());
        userInfo.setEmail(user.getEmail());

        return ResponseEntity.ok().body(userInfo);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUserInfo(@RequestBody User updatedUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        User user = userDetailsService.updateUserInfo(currentUserName, updatedUser);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> passwords) {
        String oldPassword = passwords.get("oldPassword");
        String newPassword = passwords.get("newPassword");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();

        boolean isChanged = userDetailsService.changePassword(currentUserName, oldPassword, newPassword);
        if (isChanged) {
            return ResponseEntity.ok().body("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid old password");
        }
    }
}
