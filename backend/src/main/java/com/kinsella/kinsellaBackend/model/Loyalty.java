package com.kinsella.kinsellaBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "loyalty")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Loyalty {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long loyaltyID;

    @Column(name = "loyaltyItem")
    private String loyaltyItem;


}