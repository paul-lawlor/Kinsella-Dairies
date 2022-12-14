package com.kinsella.kinsellaBackend.controllers;
import com.kinsella.kinsellaBackend.model.Accounts;
import com.kinsella.kinsellaBackend.model.Orders;
import com.kinsella.kinsellaBackend.model.Products;
import com.kinsella.kinsellaBackend.repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
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



    @PostMapping(path = "/admin", consumes = {"application/json"})
    public Products newProduct(@Validated @RequestBody Products products){
        return productsRepository.save(products);
    }

    //get product by id
    @PutMapping("/admin/{productID}")
    public Products updateProduct(@PathVariable Long productID, @Validated @RequestBody Products productRequest) {
        return productsRepository.findById(productID).map(product -> {
            if (productRequest.getProductName() != null) {
                product.setProductName(productRequest.getProductName());
            }
            if (productRequest.getPrice() != null) {
                product.setPrice(productRequest.getPrice());
            }
            if (productRequest.getImage() != null) {
                product.setImage(productRequest.getImage());
            }
            return productsRepository.save(product);
        }).orElseThrow(() -> new EntityNotFoundException("No product found with ID " + productID));
    }

    @PutMapping("/admin/stock/{productID}")
    public Products updateStock(@PathVariable Long productID, @Validated @RequestBody Products productRequest) {
        return productsRepository.findById(productID).map(product -> {
            if (productRequest.getStock() != null) {
                product.setStock(productRequest.getStock());
            }
            return productsRepository.save(product);
        }).orElseThrow(() -> new EntityNotFoundException("Could not update stock level for item " + productID));
    }

    // Delete Mapping
    @DeleteMapping("/admin/{productID}")
    public String deleteProduct(@PathVariable Long productID) {
        productsRepository.deleteById(productID);
        return "Product Deleted";
    }

}
