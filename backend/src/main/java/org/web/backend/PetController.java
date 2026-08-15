package org.web.backend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {

    private final PetRepository petRepository;

    public PetController(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    @GetMapping
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @PostMapping
    public Pet addPet(@RequestBody Pet pet) {
        return petRepository.save(pet);
    }
}