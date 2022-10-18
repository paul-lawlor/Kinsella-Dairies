package com.kinsella.kinsellaBackend.repositories;

import com.kinsella.kinsellaBackend.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductsRepository extends JpaRepository<Products, Integer>{
}
