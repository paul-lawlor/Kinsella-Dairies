package com.kinsella.kinsellaBackend.repositories;

import com.kinsella.kinsellaBackend.model.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;


public interface IAccountsRepository extends JpaRepository<Accounts, Long> {
    Collection<Accounts> findByUserID(Long user);

    Accounts findByPhoneNumber(String phoneNumber);

}
