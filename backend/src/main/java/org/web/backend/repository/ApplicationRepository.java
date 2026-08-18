package org.web.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.web.backend.model.Application;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByUserIdOrderByCreatedAtDesc(Long userId);

    Optional<Application> findByIdAndUserId(Long id, Long userId);
}