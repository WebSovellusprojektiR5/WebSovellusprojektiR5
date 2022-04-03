package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="itemcategory")
public class ItemCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iditemcategory", nullable = false)
    private Long iditemcategory;

    @Column(name="name")
    private String name;

    @Column(name="thumbnail_url")
    private String thumbnail_url;


    public ItemCategory(String name, String thumbnail_url) {
        this.name = name;
        this.thumbnail_url = thumbnail_url;
    }

    public ItemCategory() {
    }

    public Long getIditemcategory() { return iditemcategory; }

    public String getName() {
        return name;
    }

    public String getThumbnail_url() { return thumbnail_url; }

    public void setName(String name) {
        this.name = name;
    }

    public void setThumbnail_url(String thumbnail_url) { this.thumbnail_url = thumbnail_url; }
}
