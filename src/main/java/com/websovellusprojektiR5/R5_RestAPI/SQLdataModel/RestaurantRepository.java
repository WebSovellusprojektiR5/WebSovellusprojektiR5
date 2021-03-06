package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import com.sun.istack.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE restaurant SET thumbnail_url=?2 WHERE idrestaurant = ?1", nativeQuery = true)
    int updateRestaurantImage(Long restaurantID, @NotNull String url);

    //return restaurant info by id
    @Query(value = "SELECT * FROM restaurant WHERE idrestaurant = ?1", nativeQuery = true)
    Restaurant findByID(Long restaurantID);

    //return active restaurants from specific owner
    @Query(value = "SELECT * FROM restaurant WHERE owner_idperson = ?1 AND active = true", nativeQuery = true)
    List<Restaurant> findByOwnerID(Long ownerID);

    //return all active restaurants
    @Query(value = "SELECT * FROM restaurant WHERE active = true ORDER BY name", nativeQuery = true)
    List<Restaurant> getActive();
}
