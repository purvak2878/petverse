package org.web.backend.controller;

import org.web.backend.model.User;
import org.web.backend.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfileController(
            UserRepository userRepository, PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // =========================================
    // GET MY PROFILE
    // =========================================

    @GetMapping
    public ResponseEntity<?> getProfile(
            Authentication authentication
    ) {

        User user = getLoggedInUser(authentication);

        return ResponseEntity.ok(
                createSafeUserResponse(user)
        );
    }


    // =========================================
    // UPDATE PROFILE
    // =========================================

    @PutMapping
    public ResponseEntity<?> updateProfile(
            @RequestBody Map<String, String> data,
            Authentication authentication
    ) {

        User user = getLoggedInUser(authentication);


        if (data.containsKey("name")) {

            String name = data.get("name");

            if (name != null &&
                    !name.trim().isEmpty()) {

                user.setName(name.trim());

            }
        }


        if (data.containsKey("phone")) {

            user.setPhone(
                    data.get("phone")
            );

        }


        if (data.containsKey("location")) {

            user.setLocation(
                    data.get("location")
            );

        }


        User savedUser =
                userRepository.save(user);


        return ResponseEntity.ok(
                createSafeUserResponse(savedUser)
        );
    }


    // =========================================
    // UPDATE PROFILE IMAGE
    // =========================================

    @PutMapping("/image")
    public ResponseEntity<?> updateProfileImage(
            @RequestBody Map<String, String> data,
            Authentication authentication
    ) {

        User user = getLoggedInUser(authentication);


        String image =
                data.get("image");


        if (image == null ||
                image.trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Profile image is required."
                    );
        }


        /*
         * Basic validation.
         *
         * The frontend already restricts
         * the file to JPG, PNG and WebP
         * and limits it to 2 MB.
         */

        if (!image.startsWith(
                "data:image/"
        )) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Invalid image format."
                    );
        }


        user.setProfileImage(image);


        User savedUser =
                userRepository.save(user);


        return ResponseEntity.ok(
                createSafeUserResponse(savedUser)
        );
    }
    // =========================================
// CHANGE PASSWORD
// =========================================

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(
            @RequestBody Map<String, String> data,
            Authentication authentication
    ) {

        User user = getLoggedInUser(authentication);

        String currentPassword =
                data.get("currentPassword");

        String newPassword =
                data.get("newPassword");

        String confirmPassword =
                data.get("confirmPassword");


        // Check fields
        if (currentPassword == null ||
                newPassword == null ||
                confirmPassword == null) {

            return ResponseEntity
                    .badRequest()
                    .body("All password fields are required.");
        }


        // Check current password
        if (!passwordEncoder.matches(
                currentPassword,
                user.getPassword()
        )) {

            return ResponseEntity
                    .badRequest()
                    .body("Current password is incorrect.");
        }


        // Check new password
        if (newPassword.length() < 6) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "New password must contain at least 6 characters."
                    );
        }


        // Confirm password
        if (!newPassword.equals(confirmPassword)) {

            return ResponseEntity
                    .badRequest()
                    .body("New passwords do not match.");
        }


        // Don't allow same password
        if (passwordEncoder.matches(
                newPassword,
                user.getPassword()
        )) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "New password must be different from your current password."
                    );
        }


        // Encrypt new password
        user.setPassword(
                passwordEncoder.encode(newPassword)
        );


        userRepository.save(user);


        return ResponseEntity.ok(
                "Password changed successfully."
        );
    }

    // =========================================
    // DELETE ACCOUNT
    // =========================================

    @DeleteMapping
    public ResponseEntity<?> deleteAccount(
            Authentication authentication
    ) {

        User user = getLoggedInUser(authentication);


        /*
         * IMPORTANT:
         *
         * For now this deletes the User itself.
         *
         * If your Supabase database has foreign
         * key restrictions from wishlist or
         * applications, deletion may fail.
         *
         * We will handle cascading deletion
         * separately if required.
         */

        userRepository.delete(user);


        return ResponseEntity.ok(
                "Account deleted successfully."
        );
    }


    // =========================================
    // GET LOGGED-IN USER
    // =========================================

    private User getLoggedInUser(
            Authentication authentication
    ) {

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new RuntimeException(
                    "User is not authenticated."
            );
        }


        String email =
                authentication.getName();


        return userRepository
                .findByEmail(email.trim())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Logged-in user not found."
                        )
                );
    }


    // =========================================
    // SAFE USER RESPONSE
    // =========================================

    private Map<String, Object> createSafeUserResponse(
            User user
    ) {

        Map<String, Object> response =
                new HashMap<>();


        response.put(
                "id",
                user.getId()
        );

        response.put(
                "name",
                user.getName()
        );

        response.put(
                "email",
                user.getEmail()
        );

        response.put(
                "phone",
                user.getPhone()
        );

        response.put(
                "location",
                user.getLocation()
        );

        response.put(
                "profileImage",
                user.getProfileImage()
        );

        response.put(
                "createdAt",
                user.getCreatedAt()
        );


        /*
         * PASSWORD IS DELIBERATELY NOT INCLUDED.
         */

        return response;
    }
}
