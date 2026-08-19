package org.web.backend.controller;

import org.web.backend.model.Pet;
import org.web.backend.model.User;
import org.web.backend.model.Wishlist;

import org.web.backend.repository.PetRepository;
import org.web.backend.repository.UserRepository;
import org.web.backend.repository.WishlistRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final PetRepository petRepository;


    public WishlistController(
            WishlistRepository wishlistRepository,
            UserRepository userRepository,
            PetRepository petRepository
    ) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.petRepository = petRepository;
    }


    // =========================================
    // GET MY WISHLIST
    // =========================================

    @GetMapping
    public ResponseEntity<List<Pet>> getMyWishlist(
            Authentication authentication
    ) {

        User user = getLoggedInUser(authentication);

        List<Pet> pets = wishlistRepository
                .findByUser(user)
                .stream()
                .map(Wishlist::getPet)
                .toList();

        return ResponseEntity.ok(pets);
    }


    // =========================================
    // ADD PET TO WISHLIST
    // =========================================

    @PostMapping("/{petId}")
    public ResponseEntity<?> addToWishlist(
            @PathVariable Long petId,
            Authentication authentication
    ) {

        User user = getLoggedInUser(authentication);

        Pet pet = petRepository
                .findById(petId)
                .orElse(null);

        if (pet == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }


        if (wishlistRepository
                .existsByUserAndPet(user, pet)) {

            return ResponseEntity
                    .badRequest()
                    .body("Pet is already in your wishlist.");
        }


        Wishlist wishlist = new Wishlist();

        wishlist.setUser(user);
        wishlist.setPet(pet);

        wishlistRepository.save(wishlist);

        return ResponseEntity.ok(pet);
    }


    // =========================================
    // REMOVE PET FROM WISHLIST
    // =========================================

    @DeleteMapping("/{petId}")
    public ResponseEntity<?> removeFromWishlist(
            @PathVariable Long petId,
            Authentication authentication
    ) {

        User user = getLoggedInUser(authentication);

        Pet pet = petRepository
                .findById(petId)
                .orElse(null);

        if (pet == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }


        if (!wishlistRepository
                .existsByUserAndPet(user, pet)) {

            return ResponseEntity
                    .badRequest()
                    .body("Pet is not in your wishlist.");
        }


        wishlistRepository
                .deleteByUserAndPet(user, pet);

        return ResponseEntity.ok(
                "Pet removed from wishlist."
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
}