package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query(value = "SELECT * FROM item WHERE idrestaurant = ?1 AND iditemcategory = ?2", nativeQuery = true)
    List<Item> findByRestaurantIDitemcategoryID(Long idrestaurant, Long iditemcategory);

    @Query(value = "SELECT * FROM item WHERE idrestaurant = ?1", nativeQuery = true)
    List<Item> findByRestaurantID(Long idrestaurant);

    @Query(value = "SELECT * FROM item WHERE idrestaurant = ?1 and name = ?2", nativeQuery = true)
    List<Item> findByRestaurantIDname(Long idrestaurant, String name);

    @Query(value = "SELECT iditemcategory FROM item WHERE idrestaurant = ?1", nativeQuery = true)
    List<Long> findCategoriesByRestaurantID(Long idrestaurant);
}
