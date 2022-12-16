package com.kinsella.kinsellaBackend.repositories;

import com.kinsella.kinsellaBackend.model.Payments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentsRepository extends JpaRepository<Payments, Long> {
    }

