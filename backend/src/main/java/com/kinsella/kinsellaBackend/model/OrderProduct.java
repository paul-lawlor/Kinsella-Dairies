package com.kinsella.kinsellaBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "orderProduct")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderProduct {

    @OneToMany
    @JoinColumn(name = "orderID", referencedColumnName = "orderID")
    private Orders orderID;

    @OneToMany
    @JoinColumn(name = "productID", referencedColumnName = "productID")
    private Products productID;

    @Column(name = "quantity")
    private Integer quantity;

}
