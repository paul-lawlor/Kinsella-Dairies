package com.kinsella.kinsellaBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "accounts")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Accounts{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userID")
    private Long userID;

    @Column(name = "firstName")
    private String firstName;
    
    @Column(name = "lastName")
    private String lastName;
    
    @Column(name = "addressLine1")
    private String addressLineOne;
    
    @Column(name = "addressLine2")
    private String addressLineTwo;
    
    @Column(name = "postcode")
    private String postcode;
    
    @Column(name = "startDate")
    private Date startDate;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;


}