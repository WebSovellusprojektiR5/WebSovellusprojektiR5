package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

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
    int updateRestaurantImage(Long restaurantID, String url);

    @Query(value = "SELECT * FROM restaurant WHERE idrestaurant = ?1 ORDER BY name", nativeQuery = true)
    Restaurant findByID(Long restaurantID);

    @Query(value = "SELECT * FROM restaurant WHERE active = true ORDER BY name", nativeQuery = true)
    List<Restaurant> getActive();
}
