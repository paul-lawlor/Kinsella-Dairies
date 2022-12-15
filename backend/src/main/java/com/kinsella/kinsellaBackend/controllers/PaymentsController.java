package com.kinsella.kinsellaBackend.controllers;

import com.kinsella.kinsellaBackend.model.Accounts;
import com.kinsella.kinsellaBackend.model.Payments;
import com.kinsella.kinsellaBackend.model.Products;
import com.kinsella.kinsellaBackend.repositories.PaymentsRepository;
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

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
public class PaymentsController {

    @Autowired
    private PaymentsRepository paymentsRepository;

    @GetMapping("/payments")
    public List<Payments> getPayments() { return paymentsRepository.findAll();}


    @PostMapping(path = "/payments", consumes = {"application/json"})
    public Payments createPayment(@Validated @RequestBody Payments payments) {
        paymentsRepository.save(payments);
        return paymentsRepository.save(payments);
    }


}
