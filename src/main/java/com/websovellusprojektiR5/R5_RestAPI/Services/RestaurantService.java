package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Restaurant;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepo;

    @PostConstruct
    public List<Restaurant> getRestaurants(){
        return restaurantRepo.findAll();
    }

    public String addRestaurant(Restaurant restaurant){
        restaurantRepo.save(restaurant);
        return "Uusi ravintola luotu";
    }
}
