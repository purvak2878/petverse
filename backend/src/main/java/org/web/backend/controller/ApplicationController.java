package org.web.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.web.backend.dto.ApplicationRequest;
import org.web.backend.dto.ApplicationResponse;
import org.web.backend.model.Application;
import org.web.backend.model.Pet;
import org.web.backend.model.User;
import org.web.backend.repository.ApplicationRepository;
import org.web.backend.repository.PetRepository;
import org.web.backend.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;


    public ApplicationController(
            ApplicationRepository applicationRepository,
            PetRepository petRepository,
            UserRepository userRepository
    ) {
        this.applicationRepository = applicationRepository;
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }


    // =====================================================
    // CREATE APPLICATION
    // =====================================================

    @PostMapping
    public ResponseEntity<?> createApplication(
            @RequestBody ApplicationRequest request,
            Authentication authentication
    ) {

        try {

            // ---------------------------------------------
            // GET LOGGED-IN USER FROM JWT
            // ---------------------------------------------

            String email = authentication.getName();

            User user = userRepository
                    .findByEmail(email)
                    .orElse(null);

            if (user == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Logged-in user not found");
            }


            // ---------------------------------------------
            // GET SELECTED PET
            // ---------------------------------------------

            if (request.getPetId() == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Pet ID is required");
            }


            Pet pet = petRepository
                    .findById(request.getPetId())
                    .orElse(null);

            if (pet == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Pet not found");
            }


            // ---------------------------------------------
            // CREATE APPLICATION
            // ---------------------------------------------

            Application application = new Application();

            application.setUser(user);
            application.setPet(pet);

            application.setFullName(request.getFullName());
            application.setEmail(request.getEmail());
            application.setPhone(request.getPhone());
            application.setCity(request.getCity());
            application.setAddress(request.getAddress());

            application.setReason(request.getReason());
            application.setPreviousPet(request.getPreviousPet());
            application.setOtherPets(request.getOtherPets());
            application.setHousing(request.getHousing());
            application.setPermission(request.getPermission());
            application.setContactMethod(request.getContactMethod());
            application.setAgreement(request.isAgreement());

            application.setStatus("Pending");


            // ---------------------------------------------
            // SAVE
            // ---------------------------------------------

            Application savedApplication =
                    applicationRepository.save(application);


            return ResponseEntity.ok(
                    convertToResponse(savedApplication)
            );


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Failed to create application: "
                                    + e.getMessage()
                    );
        }
    }


    // =====================================================
    // GET MY APPLICATIONS
    // =====================================================

    @GetMapping("/my")
    public ResponseEntity<?> getMyApplications(
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            User user = userRepository
                    .findByEmail(email)
                    .orElse(null);

            if (user == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Logged-in user not found");
            }


            List<Application> applications =
                    applicationRepository
                            .findByUserIdOrderByCreatedAtDesc(
                                    user.getId()
                            );


            List<ApplicationResponse> response =
                    applications
                            .stream()
                            .map(this::convertToResponse)
                            .toList();


            return ResponseEntity.ok(response);


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Failed to fetch applications: "
                                    + e.getMessage()
                    );
        }
    }


    // =====================================================
    // GET ONE APPLICATION
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicationById(
            @PathVariable Long id,
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            User user = userRepository
                    .findByEmail(email)
                    .orElse(null);

            if (user == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Logged-in user not found");
            }


            Application application =
                    applicationRepository
                            .findByIdAndUserId(
                                    id,
                                    user.getId()
                            )
                            .orElse(null);


            if (application == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            return ResponseEntity.ok(
                    convertToResponse(application)
            );


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Failed to fetch application: "
                                    + e.getMessage()
                    );
        }
    }


    // =====================================================
    // UPDATE APPLICATION
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateApplication(
            @PathVariable Long id,
            @RequestBody ApplicationRequest request,
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            User user = userRepository
                    .findByEmail(email)
                    .orElse(null);

            if (user == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Logged-in user not found");
            }


            // ---------------------------------------------
            // FIND APPLICATION BELONGING TO USER
            // ---------------------------------------------

            Application application =
                    applicationRepository
                            .findByIdAndUserId(
                                    id,
                                    user.getId()
                            )
                            .orElse(null);


            if (application == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            // ---------------------------------------------
            // FIND PET
            // ---------------------------------------------

            if (request.getPetId() == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Pet ID is required");
            }


            Pet pet =
                    petRepository
                            .findById(request.getPetId())
                            .orElse(null);


            if (pet == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Pet not found");
            }


            // ---------------------------------------------
            // UPDATE FIELDS
            // ---------------------------------------------

            application.setPet(pet);

            application.setFullName(request.getFullName());
            application.setEmail(request.getEmail());
            application.setPhone(request.getPhone());
            application.setCity(request.getCity());
            application.setAddress(request.getAddress());

            application.setReason(request.getReason());
            application.setPreviousPet(request.getPreviousPet());
            application.setOtherPets(request.getOtherPets());
            application.setHousing(request.getHousing());
            application.setPermission(request.getPermission());
            application.setContactMethod(request.getContactMethod());
            application.setAgreement(request.isAgreement());


            // ---------------------------------------------
            // KEEP EXISTING STATUS
            // ---------------------------------------------

            Application updatedApplication =
                    applicationRepository.save(application);


            return ResponseEntity.ok(
                    convertToResponse(updatedApplication)
            );


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Failed to update application: "
                                    + e.getMessage()
                    );
        }
    }


    // =====================================================
    // CONVERT ENTITY → RESPONSE
    // =====================================================

    private ApplicationResponse convertToResponse(
            Application application
    ) {

        ApplicationResponse response =
                new ApplicationResponse();


        // ---------------------------------------------
        // APPLICATION
        // ---------------------------------------------

        response.setId(application.getId());

        response.setFullName(application.getFullName());
        response.setEmail(application.getEmail());
        response.setPhone(application.getPhone());
        response.setCity(application.getCity());
        response.setAddress(application.getAddress());

        response.setReason(application.getReason());
        response.setPreviousPet(application.getPreviousPet());
        response.setOtherPets(application.getOtherPets());
        response.setHousing(application.getHousing());
        response.setPermission(application.getPermission());
        response.setContactMethod(application.getContactMethod());
        response.setAgreement(application.isAgreement());

        response.setStatus(application.getStatus());

        response.setCreatedAt(application.getCreatedAt());
        response.setUpdatedAt(application.getUpdatedAt());


        // ---------------------------------------------
        // PET
        // ---------------------------------------------

        Pet pet = application.getPet();

        if (pet != null) {

            response.setPetId(pet.getId());
            response.setPetName(pet.getName());
            response.setPetType(pet.getType());
            response.setPetBreed(pet.getBreed());
            response.setPetAge(pet.getAge());
            response.setPetGender(pet.getGender());
            response.setPetCity(pet.getCity());
            response.setPetImage(pet.getImage());
        }


        return response;
    }
}