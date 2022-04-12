package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {
    @Query(value = "SELECT * FROM order_has_items WHERE idorder = ?1", nativeQuery = true)
    List<OrderItems> findItemsInOrder(Long orderID);
}