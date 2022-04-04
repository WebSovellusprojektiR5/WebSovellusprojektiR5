package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.*;
import com.websovellusprojektiR5.R5_RestAPI.Services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class RestaurantRestAPI {

    @Autowired
    RestaurantService restaurantService;

    @GetMapping("/restaurants")
    public List<Restaurant> getrestaurants() {
        return restaurantService.getRestaurants();
    }
    @GetMapping("/restauranttypes")
    public List<RestaurantType> getrestauranttypes() {
        return restaurantService.getRestaurantTypes();
    }

    @GetMapping
    public List<OpeningHours> gethours(@RequestParam Long restaurantID){
        return restaurantService.openingHours(restaurantID);
    }

    @PostMapping(path = "/restaurants", consumes = {"application/json"})
    public String addRestaurant(@RequestBody Restaurant restaurant){
        return restaurantService.addRestaurant(restaurant);
    }

    @PostMapping(path = "/hours", consumes = "application/json")
    public String sethours(@RequestBody OpeningHours openingHours){
        return restaurantService.editRestaurantHours(openingHours.getIdrestaurant(), openingHours.getWeekday(),
                openingHours.getOpening(), openingHours.getClosing());
    }

}
