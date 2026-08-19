package org.web.backend.repository;

import org.web.backend.model.User;
import org.web.backend.model.Pet;
import org.web.backend.model.Wishlist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository
        extends JpaRepository<Wishlist, Long> {


    // =========================================
    // GET ALL WISHLIST ITEMS OF A USER
    // =========================================

    List<Wishlist> findByUser(User user);


    // =========================================
    // CHECK IF PET IS ALREADY IN WISHLIST
    // =========================================

    boolean existsByUserAndPet(
            User user,
            Pet pet
    );


    // =========================================
    // FIND A SPECIFIC USER + PET ENTRY
    // =========================================

    Optional<Wishlist> findByUserAndPet(
            User user,
            Pet pet
    );


    // =========================================
    // DELETE A PET FROM USER'S WISHLIST
    // =========================================

    void deleteByUserAndPet(
            User user,
            Pet pet
    );
}
