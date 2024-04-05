package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.model.PasswordResetToken;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.PasswordResetTokenRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.service.EmailService;
import com.ecommerce.backend.service.PasswordResetService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.UUID;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {


    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public PasswordResetServiceImpl(PasswordResetTokenRepository passwordResetTokenRepository, EmailService emailService, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public void generateResetToken(User user) {
        String token = UUID.randomUUID().toString();
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.HOUR, 1);

        PasswordResetToken myToken = new PasswordResetToken(token, user, cal.getTime());
        passwordResetTokenRepository.save(myToken);

        sendResetEmail(user, token);
    }


    @Override
    public boolean validateResetToken(String token) {
        PasswordResetToken passToken = passwordResetTokenRepository.findByToken(token).orElse(null);
        if (passToken == null) {
            return false;
        }

        Calendar cal = Calendar.getInstance();
        return (passToken.getExpiryDate().getTime() - cal.getTime().getTime()) > 0;
    }

    @Override
    public void resetPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private void sendResetEmail(User user, String token) {
        String subject = "Resetowanie hasła";
        String resetUrl = "http://localhost:3000/reset-password?token=" + token;
        String message = "Aby zresetować hasło, kliknij poniższy link:\n" + resetUrl;

        emailService.sendEmail(user.getEmail(), subject, message);
    }
}

