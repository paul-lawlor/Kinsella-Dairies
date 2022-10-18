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

        @ManyToOne
        @JoinColumn(name = "userID", referencedColumnName = "userID")
        private Accounts userID;

        @OneToMany
        @JoinColumn(name = "orderID")
        private List<OrderProduct> productOrderID;

    
}
