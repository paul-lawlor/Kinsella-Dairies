package com.kinsella.kinsellaBackend.controllers;

import com.kinsella.kinsellaBackend.model.Accounts;
import com.kinsella.kinsellaBackend.repositories.AccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;


@RestController
@RequestMapping("jdbc:mariadb://localhost:3306/KD")  //NOTE: ASK ABOUT FILE PATH
public class AccountsController {

    @Autowired
    private AccountsRepository accountsRepository;

    //get account by id
    @GetMapping("/accounts/{id}")
    public List<Accounts> getAccountById(@PathVariable Long id) {
        return accountsRepository.findById(id);
    }

    //get account, and all data associated, by id
    @GetMapping("/accounts/{id}")
    public List<Accounts> getAllAccountById(@PathVariable Long id) {
        return accountsRepository.findAllById(id);
    }

    //get account by firstname
    @GetMapping("/accounts/{firstName}")
    public List<Accounts> getAccountByFirstName(@PathVariable String firstName) {
        return accountsRepository.findByFirstName(firstName);
    }

    //update account
     @PatchMapping("/accounts/{id}")
     public Accounts updateAccount(@PathVariable Long id, @Validated @RequestBody Accounts accountsRequest) {
         return accountsRepository.findById(id)
                 .map(accounts -> {
                     if (accountsRequest.getFirstName() != null) {
                         accounts.setFirstName(accountsRequest.getFirstName());
                     }
                     return accountsRepository.save(accounts);
                 }).orElseThrow(() -> new EntityNotFoundException("Account not found with id: " + id));
     }

                    //create a new instance of an account
                    @PostMapping("/accounts/{id}")
                    public Accounts createAccount (@Validated @RequestBody Accounts accounts){
                        return accountsRepository.save(accounts);
                    }

                    //delete an account and all of it's data by id
                    @DeleteMapping("/accounts/{id}")
                    public String deleteAccount (@PathVariable Long id){
                        accountsRepository.deleteById(id);
                        return "Account deleted";
                    }
                }
