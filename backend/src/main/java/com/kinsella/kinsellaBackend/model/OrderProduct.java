package com.kinsella.kinsellaBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orderProduct")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderProductID")
    private Long orderProductID;

    @ManyToOne
    @JoinColumn(name = "orderID")
    private Orders orderID;

    @ManyToOne
    @JoinColumn(name = "productID")
    private Products productID;

    @Column(name = "quantity")
    private Integer quantity;

}
