package org.web.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body("Email already registered");
        }

        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {

        System.out.println("Login request received");
        System.out.println("Email: " + loginUser.getEmail());

        User user = userRepository
                .findByEmail(loginUser.getEmail().trim())
                .orElse(null);

        if (user == null) {
            System.out.println("USER NOT FOUND");
            return ResponseEntity.badRequest()
                    .body("Invalid email or password");
        }

        System.out.println("USER FOUND");

        if (!user.getPassword().equals(loginUser.getPassword())) {
            System.out.println("PASSWORD DOES NOT MATCH");
            return ResponseEntity.badRequest()
                    .body("Invalid email or password");
        }

        System.out.println("LOGIN SUCCESSFUL");

        // Don't send password back to frontend
        user.setPassword(null);

        return ResponseEntity.ok(user);
    }
}