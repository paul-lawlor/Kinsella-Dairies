package com.kinsella.kinsellaBackend.controllers;

import com.kinsella.kinsellaBackend.model.Orders;
import com.kinsella.kinsellaBackend.repositories.OrdersRepository;
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
public class OrderController {

    @Autowired
    private OrdersRepository ordersRepository;

    @PostMapping(path="/orders/{userID}")
    public Orders addOrder(@PathVariable Long userID, @RequestBody Orders newOrder){
        return ordersRepository.save(newOrder);
    }

    @GetMapping(path="/orders/{userID}")
    public Orders getOrderById(@PathVariable String userID){
        System.out.println(ordersRepository.findByUserID(userID));
        return ordersRepository.findByUserID(userID);
    }

    @DeleteMapping(path="orders/{orderID}")
    public String deleteOrder(@PathVariable Long orderID){
        ordersRepository.deleteById(orderID);
        return "Order Cancelled";
    }


}
