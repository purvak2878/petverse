package org.web.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.web.backend.model.Pet;
import org.web.backend.repository.PetRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {

    private final PetRepository petRepository;

    private final Path uploadDirectory =
            Paths.get("uploads/pets");


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
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }


    // =========================================
    // ADD PET WITH IMAGE
    // =========================================

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> addPet(

            @RequestParam("name") String name,

            @RequestParam("type") String type,

            @RequestParam("breed") String breed,

            @RequestParam("age") String age,

            @RequestParam("gender") String gender,

            @RequestParam("city") String city,

            @RequestParam("traits") String traits,

            @RequestParam("description") String description,

            @RequestParam("vaccinated") boolean vaccinated,

            @RequestParam("healthStatus") String healthStatus,

            @RequestParam("status") String status,

            @RequestParam(value = "image", required = false)
            MultipartFile image

    ) {

        try {

            // Create uploads/pets folder if needed
            Files.createDirectories(uploadDirectory);

            String imageFileName = null;


            // =====================================
            // SAVE IMAGE
            // =====================================

            if (image != null && !image.isEmpty()) {

                String originalFileName =
                        image.getOriginalFilename();

                String extension = "";

                if (
                        originalFileName != null &&
                                originalFileName.contains(".")
                ) {

                    extension =
                            originalFileName.substring(
                                    originalFileName.lastIndexOf(".")
                            );
                }


                // Create unique filename
                imageFileName =
                        UUID.randomUUID()
                                .toString()
                                + extension;


                Path imagePath =
                        uploadDirectory.resolve(
                                imageFileName
                        );


                Files.copy(
                        image.getInputStream(),
                        imagePath,
                        StandardCopyOption.REPLACE_EXISTING
                );
            }


            // =====================================
            // CREATE PET OBJECT
            // =====================================

            Pet pet = new Pet();

            pet.setName(name);
            pet.setType(type);
            pet.setBreed(breed);
            pet.setAge(age);
            pet.setGender(gender);
            pet.setCity(city);
            pet.setTraits(traits);
            pet.setDescription(description);
            pet.setVaccinated(vaccinated);
            pet.setHealthStatus(healthStatus);
            pet.setStatus(status);

            // Save image filename in database
            pet.setImage(imageFileName);


            // =====================================
            // SAVE PET
            // =====================================

            Pet savedPet =
                    petRepository.save(pet);


            return ResponseEntity.ok(savedPet);


        } catch (IOException e) {

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Failed to upload image: "
                                    + e.getMessage()
                    );
        }
    }


    // =========================================
    // DELETE PET
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(
            @PathVariable Long id
    ) {

        if (!petRepository.existsById(id)) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        petRepository.deleteById(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}