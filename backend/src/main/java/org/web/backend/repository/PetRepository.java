package org.web.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.web.backend.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
}

