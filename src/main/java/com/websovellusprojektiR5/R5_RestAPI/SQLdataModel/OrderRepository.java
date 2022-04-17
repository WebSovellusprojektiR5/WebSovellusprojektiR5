package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    //get orders by restaurant
    @Query(value = "SELECT * FROM orders WHERE idrestaurant = ?1 ORDER BY idorder DESC", nativeQuery = true)
    List<Order> findByRestaurant(Long idrestaurant);

    //get <limit> orders starting from row <first_order> by restaurant
    @Query(value = "SELECT * FROM orders WHERE idrestaurant = ?1 ORDER BY idorder DESC LIMIT ?3 OFFSET ?2", nativeQuery = true)
    List<Order> findByRestaurantLimit(Long idrestaurant, int first_order, int limit);

    //get orders by customer
    @Query(value = "SELECT * FROM orders WHERE idperson = ?1 ORDER BY idorder DESC", nativeQuery = true)
    List<Order> findByCustomer(Long idperson);

    //get <limit> orders starting from row <first_order> by customer
    @Query(value = "SELECT * FROM orders WHERE idperson = ?1 ORDER BY idorder DESC LIMIT ?3 OFFSET ?2", nativeQuery = true)
    List<Order> findByCustomerLimit(Long idperson, int first_order, int limit);
}