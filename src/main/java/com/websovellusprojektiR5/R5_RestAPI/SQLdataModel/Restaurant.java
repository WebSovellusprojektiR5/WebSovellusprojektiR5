package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import javax.persistence.*;

@Entity
@Table(name="restaurant")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idrestaurant;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="thumbnail_url")
    private String thumbnail_url;

    public Restaurant(String name, String description, String thumbnail_url) {
        this.name = name;
        this.description = description;
        this.thumbnail_url = thumbnail_url;
    }

    public Restaurant() {
    }

    public Long getIdrestaurant() {
        return idrestaurant;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getThumbnail_url() {
        return thumbnail_url;
    }
}
