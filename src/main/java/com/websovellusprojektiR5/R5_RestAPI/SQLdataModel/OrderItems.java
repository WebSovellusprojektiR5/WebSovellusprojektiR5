package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import javax.persistence.*;

@Entity
@Table(name = "order_has_items")
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "iditem")
    private Long iditem;

    @Column(name = "idorder")
    private Long idorder;

    @Column(name = "quantity")
    private int quantity;

    public OrderItems() {
    }

    public OrderItems(Long iditem, Long idorder, int quantity) {
        this.iditem = iditem;
        this.idorder = idorder;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIditem() {
        return iditem;
    }

    public void setIditem(Long iditem) {
        this.iditem = iditem;
    }

    public Long getIdorder() {
        return idorder;
    }

    public void setIdorder(Long idorder) {
        this.idorder = idorder;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
