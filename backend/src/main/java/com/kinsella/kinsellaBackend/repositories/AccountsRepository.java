package com.kinsella.kinsellaBackend.repositories;

import com.kinsella.kinsellaBackend.model.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AccountsRepository extends JpaRepository<Accounts, Integer>{
}