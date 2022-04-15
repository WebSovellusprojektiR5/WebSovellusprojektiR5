package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import javax.persistence.*;

@Entity
@Table(name="restaurant")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idrestaurant")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="thumbnail_url")
    private String thumbnail_url;

    @Column(name="picture_url")
    private String picture_url;

    @Column(name="price_level")
    private Integer price_level;

    @Column(name="address1")
    private String address1;

    @Column(name="address2")
    private String address2;

    @Column(name="city")
    private String city;

    @Column(name="phone")
    private String phone;

    @Column(name="owner_idperson")
    private Long idperson;

    @Column(name="idrestauranttype")
    private Long idrestauranttype;

    @Column(name="active")
    private boolean active;

    public Restaurant(String name, String description, String thumbnail_url, String picture_url, Integer price_level, String address1, String address2, String city, String phone, Long idperson, Long idrestauranttype) {
        this.name = name;
        this.description = description;
        this.thumbnail_url = thumbnail_url;
        this.picture_url = picture_url;
        this.price_level = price_level;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.phone = phone;
        this.idperson = idperson;
        this.idrestauranttype = idrestauranttype;
    }

    public Restaurant() {
    }

    public Long getId() {
        return id;
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

    public String getPicture_url() {
        return picture_url;
    }

    public Integer getPrice_level() {
        return price_level;
    }

    public String getAddress1() {
        return address1;
    }

    public String getAddress2() {
        return address2;
    }

    public String getCity() {
        return city;
    }

    public String getPhone() {
        return phone;
    }

    public Long getIdperson() {
        return idperson;
    }

    public Long getIdrestauranttype() {
        return idrestauranttype;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setThumbnail_url(String thumbnail_url) {
        this.thumbnail_url = thumbnail_url;
    }

    public void setPicture_url(String picture_url) {
        this.picture_url = picture_url;
    }

    public void setPrice_level(Integer price_level) {
        this.price_level = price_level;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setIdperson(Long idperson) {
        this.idperson = idperson;
    }

    public void setIdrestauranttype(Long idrestauranttype) {
        this.idrestauranttype = idrestauranttype;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
