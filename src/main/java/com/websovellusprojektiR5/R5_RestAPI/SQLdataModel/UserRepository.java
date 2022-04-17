package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //return user by username
    @Query(value = "SELECT * FROM person WHERE username = ?1", nativeQuery = true)
    User findByUsername(String username);

    //return active user by id
    @Query(value = "SELECT * FROM person WHERE idperson = ?1 AND active = true", nativeQuery = true)
    User findByID(Long idperson);

    //check user credentials
    @Query(value = "SELECT * FROM person WHERE username = ?1 AND pword = ?2 AND active = true", nativeQuery = true)
    User checkCredentials(String username, String password);
}