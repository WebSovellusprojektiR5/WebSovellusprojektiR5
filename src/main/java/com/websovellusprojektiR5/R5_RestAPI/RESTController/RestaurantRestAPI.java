package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.OpeningHours;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Restaurant;
import com.websovellusprojektiR5.R5_RestAPI.Services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.List;

@RestController
public class RestaurantRestAPI {

    @Autowired
    RestaurantService restaurantService;

    @CrossOrigin
    @GetMapping("/restaurants")
    public List<Restaurant> getrestaurants() {
        return restaurantService.getRestaurants();
    }

    @CrossOrigin
    @GetMapping
    public List<OpeningHours> gethours(@RequestParam Long restaurantID){
        return restaurantService.openingHours(restaurantID);
    }

    @PostMapping(path = "/restaurants", consumes = {"application/json"})
    public String addRestaurant(@RequestBody Restaurant restaurant){
        return restaurantService.addRestaurant(restaurant);
    }

    @PostMapping(path = "/hours", consumes = {"application/json"})
    public String sethours(@RequestParam Long restaurantID, String weekday,
                           int opening_hour, int opening_minute,
                           int closing_hour, int closing_minute){
        return restaurantService.editRestaurantHours(restaurantID, weekday, opening_hour, opening_minute,
                closing_hour, closing_minute);
    }

}
