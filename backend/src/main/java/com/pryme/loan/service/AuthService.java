package com.pryme.loan.service;

import com.pryme.loan.dto.AuthResponse;
import com.pryme.loan.dto.LoginRequest;
import com.pryme.loan.dto.RegisterRequest;
import com.pryme.loan.entity.User;
import com.pryme.loan.repository.UserRepository;
import com.pryme.loan.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        // 1. Check if user exists
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + request.email());
        }

        // 2. Create new user entity
        User user = new User();
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password())); // Critical: Hash the password
        user.setFullName(request.fullName());
        user.setMobile(request.mobile());
        user.setRole("USER"); // Default role

        userRepository.save(user);

        // 3. Auto-login (Generate Token)
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getRole(), user.getFullName());
    }

    public AuthResponse login(LoginRequest request) {
        // 1. Authenticate using Spring Security Manager
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        // 2. If successful, fetch user and generate token
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getRole(), user.getFullName());
    }
}