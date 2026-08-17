package org.web.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.web.backend.model.Pet;
import org.web.backend.repository.PetRepository;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {

    private final PetRepository petRepository;

    public PetController(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    // =========================================
    // GET ALL PETS
    // =========================================

    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        return ResponseEntity.ok(
                petRepository.findAll()
        );
    }


    // =========================================
    // GET ONE PET BY ID
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(
            @PathVariable Long id
    ) {

        return petRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // =========================================
    // ADD PET
    // =========================================

    @PostMapping
    public ResponseEntity<Pet> addPet(
            @RequestBody Pet pet
    ) {

        Pet savedPet =
                petRepository.save(pet);

        return ResponseEntity.ok(savedPet);
    }


    // =========================================
    // DELETE PET
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(
            @PathVariable Long id
    ) {

        if (!petRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        petRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}

