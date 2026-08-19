package org.web.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "wishlists",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_wishlist_user_pet",
                        columnNames = {"user_id", "pet_id"}
                )
        }
)
public class Wishlist {

    // =========================================
    // PRIMARY KEY
    // =========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================================
    // USER
    // =========================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;


    // =========================================
    // PET
    // =========================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "pet_id",
            nullable = false
    )
    private Pet pet;


    // =========================================
    // CREATED DATE
    // =========================================

    @Column(nullable = false)
    private LocalDateTime createdAt;


    // =========================================
    // CONSTRUCTOR
    // =========================================

    public Wishlist() {
    }


    // =========================================
    // PRE PERSIST
    // =========================================

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();

    }


    // =========================================
    // GETTERS & SETTERS
    // =========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}