package org.web.backend.controller;

import org.web.backend.model.User;
import org.web.backend.repository.UserRepository;

import org.web.backend.dto.LoginRequest;
import org.web.backend.dto.LoginResponse;
import org.web.backend.dto.RegisterRequest;

import org.web.backend.security.JwtService;

import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;


    public UserController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            UserDetailsService userDetailsService,
            AuthenticationManager authenticationManager
    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
    }


    // =========================================
    // REGISTER
    // =========================================

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody RegisterRequest request
    ) {


        if (request.getEmail() == null ||
                request.getPassword() == null ||
                request.getName() == null) {

            return ResponseEntity
                    .badRequest()
                    .body("Name, email and password are required");
        }


        String email =
                request.getEmail().trim();


        if (userRepository.existsByEmail(email)) {

            return ResponseEntity
                    .badRequest()
                    .body("Email already registered");
        }


        User user = new User();


        user.setName(
                request.getName().trim()
        );


        user.setEmail(email);


        // HASH PASSWORD
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );


        user.setPhone(
                request.getPhone()
        );


        user.setLocation(
                request.getLocation()
        );


        User savedUser =
                userRepository.save(user);


        return ResponseEntity.ok(
                "Account created successfully"
        );
    }


    // =========================================
    // LOGIN
    // =========================================

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody LoginRequest request
    ) {


        if (request.getEmail() == null ||
                request.getPassword() == null) {

            return ResponseEntity
                    .badRequest()
                    .body("Email and password are required");
        }


        try {


            String email =
                    request.getEmail().trim();


            // Spring Security checks
            // email + password
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            request.getPassword()
                    )
            );


            // Find actual user
            User user =
                    userRepository
                            .findByEmail(email)
                            .orElseThrow();


            // Load user details
            UserDetails userDetails =
                    userDetailsService
                            .loadUserByUsername(email);


            // Generate JWT
            String token =
                    jwtService.generateToken(
                            userDetails
                    );


            // User information for frontend
            LoginResponse.UserResponse userResponse =
                    new LoginResponse.UserResponse(
                            user.getId(),
                            user.getName(),
                            user.getEmail(),
                            user.getPhone(),
                            user.getLocation(),
                            user.getProfileImage()
                    );


            LoginResponse response =
                    new LoginResponse(
                            token,
                            userResponse
                    );


            return ResponseEntity.ok(response);


        } catch (Exception e) {


            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }
    }
}