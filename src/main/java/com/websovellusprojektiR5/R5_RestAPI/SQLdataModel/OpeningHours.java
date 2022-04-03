package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Table(name = "opentime")
public class OpeningHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idopentime", nullable = false)
    private Long id;

    @Column(name = "weekday")
    private String weekday;

    @Column(name = "opening")
    private Time opening;

    @Column(name = "closing")
    private Time closing;

    @Column(name = "idrestaurant")
    private Long idrestaurant;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OpeningHours() {
    }

    public OpeningHours(String weekday, Time opening, Time closing, Long idrestaurant) {
        this.weekday = weekday;
        this.opening = opening;
        this.closing = closing;
        this.idrestaurant = idrestaurant;
    }

    public String getWeekday() {
        return weekday;
    }

    public void setWeekday(String weekday) {
        this.weekday = weekday;
    }

    public Time getOpening() {
        return opening;
    }

    public void setOpening(Time opening) {
        this.opening = opening;
    }

    public Time getClosing() {
        return closing;
    }

    public void setClosing(Time closing) {
        this.closing = closing;
    }

    public Long getIdrestaurant() {
        return idrestaurant;
    }

    public void setIdrestaurant(Long idrestaurant) {
        this.idrestaurant = idrestaurant;
    }
}
