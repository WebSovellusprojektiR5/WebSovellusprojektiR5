package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.List;

@Repository
public interface OpeningHoursRepository extends JpaRepository<OpeningHours, Long> {
    @Query(value = "SELECT * FROM opentime WHERE idrestaurant = ?1", nativeQuery = true)
    List<OpeningHours> getRestaurantOpeningHours(Long restaurantID);

    @Query(value = "SELECT * FROM opentime WHERE idrestaurant = ?1 AND weekday = ?2", nativeQuery = true)
    OpeningHours getRestaurantOpeningHoursByDay(Long restaurantID, String weekday);

    @Query(value = "UPDATE opentime SET opening = ?1, closing = ?2 WHERE idopentime = ?3", nativeQuery = true)
    OpeningHours updateRestaurantOpeningHours(Time opening, Time closing, Long opentimeID);
}