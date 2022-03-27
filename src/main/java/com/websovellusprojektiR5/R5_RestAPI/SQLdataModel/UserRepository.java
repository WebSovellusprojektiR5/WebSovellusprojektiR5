package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT idperson FROM person WHERE username = ?1")
    User findByUsername(String username);

    @Query("SELECT idperson FROM person WHERE username = ?1 AND pword = ?2")
    User checkCredentials(String username, String password);
}