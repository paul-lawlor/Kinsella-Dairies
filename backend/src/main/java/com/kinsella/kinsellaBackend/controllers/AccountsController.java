package com.kinsella.kinsellaBackend.controllers;

import com.kinsella.kinsellaBackend.model.Accounts;
import com.kinsella.kinsellaBackend.repositories.IAccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

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

    //create a new instance of an account
    @PostMapping(path = "/accounts", consumes = {"application/json"})
    public Accounts createAccount(@Validated @RequestBody Accounts accounts) {
        accountsRepository.save(accounts);
        return accountsRepository.save(accounts);
    }
    
    //account login handling
    @PostMapping(path = "/login", consumes = {"application/json"})
    public String loginUser(@Validated @RequestBody String accounts) {
        //recieve post request
        //find entry that matches email
        //find email that matches password
        //return appropriate message
        //@Query("")
        System.out.println(accounts);
        return "hello";
    }

}



