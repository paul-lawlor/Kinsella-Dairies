package com.kinsella.kinsellaBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Orders {
    

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "orderID")
        private Long orderID;

        @Column(name = "totalPrice")
        private Integer totalPrice;

        @Column(name = "userID")
        private String userID;

//        @ManyToOne
//        @JoinColumn(name = "userID", referencedColumnName = "userID")
//        private Accounts userID;

        @Column(name = "items")
        private String items;

//        @OneToMany
//        @JoinColumn(name = "productOrderID")
//        private List<OrderProduct> productOrderID;

    
}
