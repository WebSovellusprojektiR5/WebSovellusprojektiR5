package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import javax.persistence.*;

@Entity
@Table(name="personrole")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idpersonrole", nullable = false)
    private Long id;

    @Column(name="role")
    private String role;

    public UserRole(String role) {
        this.role = role;
    }

    public UserRole() {
    }

    public Long getId() {
        return id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
