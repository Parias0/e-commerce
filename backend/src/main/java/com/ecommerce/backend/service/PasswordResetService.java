package com.ecommerce.backend.service;

import com.ecommerce.backend.model.User;

public interface PasswordResetService {

    void generateResetToken(User user);
    boolean validateResetToken(String token);
    void resetPassword(User user, String newPassword);
}
