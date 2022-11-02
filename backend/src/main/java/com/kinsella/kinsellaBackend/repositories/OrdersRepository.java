package com.kinsella.kinsellaBackend.repositories;

import com.kinsella.kinsellaBackend.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrdersRepository extends JpaRepository<Orders, Long>{
    Orders findByUserID(String userID);

}
