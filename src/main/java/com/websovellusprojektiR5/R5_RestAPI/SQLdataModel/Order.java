package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idorder", nullable = false)
    private Long id;

    @Column(name = "idperson")
    private Long idperson;

    @Column(name = "idrestaurant")
    private Long idrestaurant;

    @Column(name = "address1")
    private String address1;

    @Column(name = "address2")
    private String address2;

    @Column(name = "ordered_time", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp ordered_time;

    @Column(name = "completed_time")
    private Timestamp completed_time;

    @Column(name = "comment")
    private String comment;

    @Column(name = "price")
    private Double price;

    public Order() {
    }

    public Order(Long idperson,
                 Long idrestaurant,
                 String address1,
                 String address2,
                 Timestamp ordered_time,
                 Timestamp completed_time,
                 String comment, Double price){
        this.idperson = idperson;
        this.idrestaurant = idrestaurant;
        this.address1 = address1;
        this.address2 = address2;
        this.ordered_time = ordered_time;
        this.completed_time = completed_time;
        this.comment = comment;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdperson() {
        return idperson;
    }

    public void setIdperson(Long idperson) {
        this.idperson = idperson;
    }

    public Long getIdrestaurant() {
        return idrestaurant;
    }

    public void setIdrestaurant(Long idrestaurant) {
        this.idrestaurant = idrestaurant;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public Timestamp getOrdered_time() {
        return ordered_time;
    }

    public void setOrdered_time(Timestamp ordered_time) {
        this.ordered_time = ordered_time;
    }

    public Timestamp getCompleted_time() {
        return completed_time;
    }

    public void setCompleted_time(Timestamp completed_time) {
        this.completed_time = completed_time;
    }

    public String getComment() {
        return comment;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
