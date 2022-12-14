package com.kinsella.kinsellaBackend.controllers;
import com.kinsella.kinsellaBackend.model.Accounts;
import com.kinsella.kinsellaBackend.model.Orders;
import com.kinsella.kinsellaBackend.model.Products;
import com.kinsella.kinsellaBackend.repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

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

    /*
    @GetMapping({"/{ticketId}/comment/{commentNumber}", ""})
    public ResponseEntity getTicketComment(@PathVariable(name = "ticketId") Long ticketId, @PathVariable(name = "commentNumber") Long commentNum){
    */

    @PostMapping(path = "/admin/add/{name}/{price}/{stock}")
    public String newProduct (@RequestParam("image") MultipartFile file,
                              @PathVariable(name = "name") String name,
                              @PathVariable(name = "price") Double price,
                              @PathVariable(name = "stock") Integer stock) throws IOException{

        // Create product instance
        Products product = new Products();

        // Create path to send to database
        String imagePath = "/" + file.getOriginalFilename();

        // Save image
        byte[] bytes = file.getBytes();
        Path path = Paths.get("../frontend/public/" + file.getOriginalFilename());
        Files.write(path, bytes);

        // Set Data
        product.setProductName(name);
        product.setPrice(price);
        product.setStock(stock);
        product.setImage(imagePath);

        productsRepository.save(product);

        // Save to database
        return "Success";
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
