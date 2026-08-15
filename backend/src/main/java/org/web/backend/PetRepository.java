package org.web.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.web.backend.model.Pet;

public interface PetRepository extends MongoRepository<Pet, String> {
}