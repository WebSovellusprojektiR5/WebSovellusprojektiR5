package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import javax.persistence.*;

@Entity
@Table(name="restauranttype")
public class RestaurantType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idrestauranttype")
    private Long id;

    @Column(name="name")
    private String name;

    public RestaurantType(String name) {
        this.name = name;
    }

    public RestaurantType() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
