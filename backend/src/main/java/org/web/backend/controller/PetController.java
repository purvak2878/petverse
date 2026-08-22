package org.web.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.web.backend.model.Pet;
import org.web.backend.repository.PetRepository;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://petverse-frontend-8ori.onrender.com"
})
public class PetController {

    private final PetRepository petRepository;

    private final HttpClient httpClient =
            HttpClient.newHttpClient();

    private static final String BUCKET =
            "pet-images";


    public PetController(
            PetRepository petRepository
    ) {
        this.petRepository = petRepository;
    }


    // =====================================================
    // GET ALL PETS
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {

        return ResponseEntity.ok(
                petRepository.findAll()
        );
    }


    // =====================================================
    // GET ONE PET
    // =====================================================

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


    // =====================================================
    // ADD PET WITH IMAGE
    // =====================================================

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> addPet(

            @RequestParam("name")
            String name,

            @RequestParam("type")
            String type,

            @RequestParam("breed")
            String breed,

            @RequestParam("age")
            String age,

            @RequestParam("gender")
            String gender,

            @RequestParam("city")
            String city,

            @RequestParam("traits")
            String traits,

            @RequestParam("description")
            String description,

            @RequestParam("vaccinated")
            boolean vaccinated,

            @RequestParam("healthStatus")
            String healthStatus,

            @RequestParam("status")
            String status,

            @RequestParam(
                    value = "image",
                    required = false
            )
            MultipartFile image
    ) {

        try {

            String imageUrl = null;

            // =================================================
            // UPLOAD IMAGE TO SUPABASE
            // =================================================

            if (image != null && !image.isEmpty()) {

                imageUrl = uploadToSupabase(image);
            }


            // =================================================
            // CREATE PET
            // =================================================

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

            // Store PUBLIC Supabase URL
            pet.setImage(imageUrl);


            Pet savedPet =
                    petRepository.save(pet);


            return ResponseEntity.ok(savedPet);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            "Failed to upload pet image: "
                                    + e.getMessage()
                    );
        }
    }


    // =====================================================
    // UPDATE PET
    // =====================================================

    @PutMapping(
            value = "/{id}",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<?> updatePet(

            @PathVariable Long id,

            @RequestParam("name")
            String name,

            @RequestParam("type")
            String type,

            @RequestParam("breed")
            String breed,

            @RequestParam("age")
            String age,

            @RequestParam("gender")
            String gender,

            @RequestParam("city")
            String city,

            @RequestParam("traits")
            String traits,

            @RequestParam("description")
            String description,

            @RequestParam("vaccinated")
            boolean vaccinated,

            @RequestParam("healthStatus")
            String healthStatus,

            @RequestParam("status")
            String status,

            @RequestParam(
                    value = "image",
                    required = false
            )
            MultipartFile image
    ) {

        try {

            Pet pet =
                    petRepository.findById(id)
                            .orElse(null);


            if (pet == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            // =================================================
            // UPDATE PET DETAILS
            // =================================================

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


            // =================================================
            // UPDATE IMAGE IF NEW IMAGE SELECTED
            // =================================================

            if (image != null && !image.isEmpty()) {

                String imageUrl =
                        uploadToSupabase(image);

                pet.setImage(imageUrl);
            }


            Pet updatedPet =
                    petRepository.save(pet);


            return ResponseEntity.ok(updatedPet);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(
                            "Failed to update pet: "
                                    + e.getMessage()
                    );
        }
    }


    // =====================================================
    // DELETE PET
    // =====================================================

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


    // =====================================================
    // SUPABASE STORAGE UPLOAD
    // =====================================================

    private String uploadToSupabase(
            MultipartFile image
    ) throws IOException, InterruptedException {

        String supabaseUrl =
                System.getenv("SUPABASE_URL");

        String supabaseServiceRoleKey =
                System.getenv("SUPABASE_SERVICE_ROLE_KEY");


        // =================================================
        // CHECK ENVIRONMENT VARIABLES
        // =================================================

        if (supabaseUrl == null ||
                supabaseUrl.isBlank()) {

            throw new IllegalStateException(
                    "SUPABASE_URL is not configured."
            );
        }


        if (supabaseServiceRoleKey == null ||
                supabaseServiceRoleKey.isBlank()) {

            throw new IllegalStateException(
                    "SUPABASE_SERVICE_ROLE_KEY is not configured."
            );
        }


        // =================================================
        // GET FILE EXTENSION
        // =================================================

        String originalName =
                image.getOriginalFilename();

        String extension = "";

        if (originalName != null &&
                originalName.contains(".")) {

            extension =
                    originalName.substring(
                            originalName.lastIndexOf(".")
                    ).toLowerCase();
        }


        // =================================================
        // CREATE UNIQUE FILE NAME
        // =================================================

        String fileName =
                UUID.randomUUID()
                        .toString()
                        + extension;


        String storagePath =
                "pets/" + fileName;


        // =================================================
        // SUPABASE UPLOAD URL
        // =================================================

        String uploadUrl =
                supabaseUrl
                        .replaceAll("/$", "")
                        + "/storage/v1/object/"
                        + BUCKET
                        + "/"
                        + storagePath;


        // =================================================
        // CREATE HTTP REQUEST
        // =================================================

        String contentType =
                image.getContentType() != null
                        ? image.getContentType()
                        : "application/octet-stream";


        HttpRequest request =
                HttpRequest.newBuilder()
                        .uri(
                                URI.create(uploadUrl)
                        )
                        .header(
                                "Authorization",
                                "Bearer "
                                        + supabaseServiceRoleKey
                        )
                        .header(
                                "apikey",
                                supabaseServiceRoleKey
                        )
                        .header(
                                "Content-Type",
                                contentType
                        )
                        .header(
                                "x-upsert",
                                "false"
                        )
                        .POST(
                                HttpRequest.BodyPublishers
                                        .ofByteArray(
                                                image.getBytes()
                                        )
                        )
                        .build();


        // =================================================
        // SEND TO SUPABASE
        // =================================================

        HttpResponse<String> response =
                httpClient.send(
                        request,
                        HttpResponse.BodyHandlers
                                .ofString()
                );


        // =================================================
        // CHECK SUPABASE RESPONSE
        // =================================================

        if (response.statusCode() < 200 ||
                response.statusCode() >= 300) {

            throw new IOException(
                    "Supabase Storage upload failed. "
                            + "HTTP "
                            + response.statusCode()
                            + ": "
                            + response.body()
            );
        }


        // =================================================
        // RETURN PUBLIC IMAGE URL
        // =================================================

        return supabaseUrl
                .replaceAll("/$", "")
                + "/storage/v1/object/public/"
                + BUCKET
                + "/"
                + storagePath;
    }
}