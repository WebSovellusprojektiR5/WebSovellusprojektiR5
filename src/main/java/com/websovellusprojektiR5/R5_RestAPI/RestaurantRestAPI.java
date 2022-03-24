package com.websovellusprojektiR5.R5_RestAPI;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
