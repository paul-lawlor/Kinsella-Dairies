package com.kinsella.kinsellaBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;


@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "productID")
    private Long productID;

    @Column(name = "productName")
    private String productName;

    @Column (name = "price")
    private Integer price;

    @OneToMany
    @JoinColumn(name = "productID")
    private List<OrderProduct> orderProductID;



}
