package com.kinsella.kinsellaBackend.controllers;

import com.kinsella.kinsellaBackend.model.Accounts;
import com.kinsella.kinsellaBackend.repositories.IAccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.persistence.EntityNotFoundException;
import java.util.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AccountsController {

    @Autowired
    private IAccountsRepository accountsRepository;

    //get accounts
    @GetMapping("/accounts")
    public List<Accounts> getAccounts() { return accountsRepository.findAll();}

    //get account by id
    @GetMapping("/accounts/{userID}")
    public Collection<Accounts> getAccountByID(@PathVariable Long userID) {
        return accountsRepository.findByUserID(userID);
    }

    //get account by id
    @PutMapping("/accounts/{userID}")
    public Accounts updateAccount(@PathVariable Long userID, @Validated @RequestBody Accounts accountRequest) {
        return accountsRepository.findById(userID).map(account -> {
            if (accountRequest.getFirstName() != null) {
                account.setFirstName(accountRequest.getFirstName());
            }
            if (accountRequest.getLastName() != null) {
                account.setLastName(accountRequest.getLastName());
            }
            if (accountRequest.getPhoneNumber() != null) {
                account.setPhoneNumber(accountRequest.getPhoneNumber());
            }
            if (accountRequest.getAddressLineOne() != null) {
                account.setAddressLineOne(accountRequest.getAddressLineOne());
            }
            if (accountRequest.getAddressLineOne() != null) {
                account.setAddressLineTwo(accountRequest.getAddressLineOne());
            }
            if (accountRequest.getPostcode() != null) {
                account.setPostcode(accountRequest.getPostcode());
            }
            if (accountRequest.getPassword() != null) {
                account.setPassword(accountRequest.getPassword());
            }
            return accountsRepository.save(account);
        }).orElseThrow(() -> new EntityNotFoundException("No account found with ID " + userID));
    }

    // Delete Mapping
    @DeleteMapping("accounts/{userID}")
    public String deleteAccount(@PathVariable Long userID) {
        accountsRepository.deleteById(userID);
        return "Account Deleted";
    }

    //create a new instance of an account
    @PostMapping(path = "/accounts", consumes = {"application/json"})
    public Accounts createAccount(@Validated @RequestBody Accounts accounts) {
        accountsRepository.save(accounts);
        return accountsRepository.save(accounts);
    }



    //account login handling
    @PostMapping(path = "/login", consumes = {"application/json"})
    public String loginUser(@Validated @RequestBody Accounts account) {
        System.out.println(account);

        Accounts existingAccount = accountsRepository.findByPhoneNumber(account.getPhoneNumber());
        Long id = existingAccount.getUserID();


        if (existingAccount.getPassword().equals(account.getPassword())) {
            return "t,"+id;
        }
        return "f";
        //return existingAccount.getPassword().equals(account.getPassword());
    }

}



