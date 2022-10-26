package com.kinsella.kinsellaBackend.repositories;

import com.kinsella.kinsellaBackend.model.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;


public interface IAccountsRepository extends JpaRepository<Accounts, Integer>{
    Collection<Accounts> findByUserID(Long user);
    Accounts findByPhoneNumberAndPassword(String phoneNumber, String password);
}
