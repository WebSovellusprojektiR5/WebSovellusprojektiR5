package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.*;
import org.springframework.beans.factory.annotation.Autowired;
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
        return restaurantRepo.findAll();
    }
    public List<RestaurantType> getRestaurantTypes(){
        return restaurantTypeRepo.findAll();
    }

    public String addRestaurant(Restaurant restaurant){
        restaurantRepo.save(restaurant);
        return "Uusi ravintola luotu";
    }

    public String editRestaurantImage(Long restaurantID, MultipartFile mpf) {
        if (restaurantRepo.findById(restaurantID).orElse(null) == null) return "Ravintolaa ei löydy!";
        String imageURL = imageService.UploadImage(mpf);
        if (imageURL == "") return "Kuvan lataaminen pilveen epäonnistui!";
        if (restaurantRepo.updateRestaurantImage(restaurantID, imageURL) > 0)
            return "Kuva lisätty OK! URL: " + imageURL;
        else return "Kuvan lisääminen kantaan epäonnistui!";
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
