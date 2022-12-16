package com.kinsella.kinsellaBackend.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "payments")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column (name = "paymentID")
    private Long paymentID;

    @Column (name = "cardNumber")
    private String cardNumber;
    
    @Column (name = "expiry")
    private String expiry;

    @Column (name = "cvv")
    private String cvv;
}
