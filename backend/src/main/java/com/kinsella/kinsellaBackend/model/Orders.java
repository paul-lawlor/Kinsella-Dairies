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

        @Column(
                name = "items",
                columnDefinition = "TEXT",
                length = 65534
        )
        private String items;

        @Column (name= "type")
        private String type;
    
}
