package com.kinsella.kinsellaBackend.controllers;
import com.kinsella.kinsellaBackend.model.Accounts;
import com.kinsella.kinsellaBackend.model.Products;
import com.kinsella.kinsellaBackend.repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductsController {

    @Autowired
    private ProductsRepository productsRepository;

    //get accounts
    @GetMapping("/products")
    public List<Products> getProducts() {
        return productsRepository.findAll();
    }

    @GetMapping("/products/{productID}")
    public Collection<Products> getProductByID(@PathVariable Long productID) {
        return productsRepository.findByProductID(productID);
    }




}
