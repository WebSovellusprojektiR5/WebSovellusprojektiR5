package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.sql.Time;
import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepo;
    @Autowired
    RestaurantTypeRepository restaurantTypeRepo;
    @Autowired
    OpeningHoursRepository openRepo;
    @Autowired
    ImageService imageService;

    @PostConstruct
    public List<Restaurant> getRestaurants(){
        return restaurantRepo.findAll(Sort.by("name"));
    }
    public List<Restaurant> getActiveRestaurants(){
        return restaurantRepo.getActive();
    }
    public List<RestaurantType> getRestaurantTypes(){
        return restaurantTypeRepo.findAll();
    }

    public Restaurant getRestaurantByID(Long restaurantID){
        return restaurantRepo.findByID(restaurantID);
    }

    public Restaurant addRestaurant(Restaurant restaurant){
        restaurant.setActive(true);
        return restaurantRepo.save(restaurant);
    }

    public String editRestaurant(Restaurant restaurant){
        if(restaurantRepo.findById(restaurant.getId()).orElse(null) == null)
            return "Error: Restaurant doesn't exist!";

        restaurantRepo.save(restaurant);
        return "Restaurant updated OK";
    }

    public String deleteRestaurant(Long restaurantID){
        if(restaurantRepo.findById(restaurantID).orElse(null) == null)
            return "Error: Restaurant doesn't exist!";

        Restaurant restaurant = restaurantRepo.getById(restaurantID);
        restaurant.setActive(false);
        restaurantRepo.save(restaurant);
        return "Restaurant deactivated OK";
    }

    public String updateRestaurantImage(Long restaurantID, MultipartFile mpf) {
        if (restaurantRepo.findById(restaurantID).orElse(null) == null) return "Restaurant not found!";
        String imageURL = imageService.UploadImage(mpf);
        if (imageURL == "") return "Error: Uploading picture to Cloudinary failed!";
        if (restaurantRepo.updateRestaurantImage(restaurantID, imageURL) > 0)
            return "Picture updated OK! URL: " + imageURL;
        else return "Error: Updating picture URL to database failed!";
    }

    public String editRestaurantHours(Long restaurantID, String weekday, Time opening, Time closing){
        OpeningHours hours = openRepo.getRestaurantOpeningHoursByDay(restaurantID, weekday);
        hours.setIdrestaurant(restaurantID);
        hours.setWeekday(weekday);
        hours.setOpening(opening);
        hours.setClosing(closing);
        openRepo.save(hours);
        return weekday + " aukioloajat päivitetty";
    }

    public List<OpeningHours> openingHours(Long restaurantID){
        return openRepo.getRestaurantOpeningHours(restaurantID);
    }
}
