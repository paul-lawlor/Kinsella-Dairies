package com.kinsella.kinsellaBackend.repositories;

import com.kinsella.kinsellaBackend.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;


public interface ProductsRepository extends JpaRepository<Products, Integer>{
    Collection<Products> findByProductID(Long productID);
}
