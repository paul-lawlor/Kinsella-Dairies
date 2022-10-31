package com.kinsella.kinsellaBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


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
    private Double price;

    @Column (name = "image")
    private String image;


//    public Products(String s, double v) {
//    }
}
