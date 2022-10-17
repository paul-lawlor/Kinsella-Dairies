package com.kinsella.kinsellaBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Orders {
    

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long orderID;

        @Column(name = "totalPrice")
        private Integer totalPrice;

        @ManyToOne
        @JoinColumn(name = "userID", referencedColumnName = "userID")
        private Accounts userID;


    
}
