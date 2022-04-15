package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;
import javax.persistence.*;

@Entity
@Table(name="item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iditem", nullable = false)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="thumbnail_url")
    private String thumbnail_url;

    @Column(name="price")
    private Double price;

    @Column(name="idrestaurant")
    private Long idrestaurant;

    @Column(name="iditemcategory")
    private Long iditemcategory;

    @Column(name="valid")
    private boolean valid;

    public Item(String name, String description, String thumbnail_url, Double price, Long idrestaurant, Long iditemcategory) {
        this.name = name;
        this.description = description;
        this.thumbnail_url = thumbnail_url;
        this.price = price;
        this.idrestaurant = idrestaurant;
        this.iditemcategory = iditemcategory;
    }

    public Item() {
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

    public Double getPrice() {
        return price;
    }

    public Long getIdrestaurant() {
        return idrestaurant;
    }

    public Long getIditemCategory() {
        return iditemcategory;
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

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setIdrestaurant(Long idrestaurant) {
        this.idrestaurant = idrestaurant;
    }

    public void setIditemcategory(Long iditemcategory) { this.iditemcategory = iditemcategory; }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }
}
