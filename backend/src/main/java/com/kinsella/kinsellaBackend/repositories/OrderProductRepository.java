package com.kinsella.kinsellaBackend.repositories;

import com.kinsella.kinsellaBackend.model.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer>{
}
