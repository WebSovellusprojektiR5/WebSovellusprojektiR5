package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.*;
import com.websovellusprojektiR5.R5_RestAPI.Services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        return restaurantService.getActiveRestaurants();
    }
    @GetMapping("/restauranttypes")
    public List<RestaurantType> getrestauranttypes() {
        return restaurantService.getRestaurantTypes();
    }

    @GetMapping("/hours")
    public List<OpeningHours> gethours(@RequestParam Long restaurantID){
        return restaurantService.openingHours(restaurantID);
    }

    @PostMapping(path = "/restaurants", consumes = {"application/json"})
    public ResponseEntity<Long> addRestaurant2(@RequestBody Restaurant restaurant){
        Restaurant res = restaurantService.addRestaurant(restaurant);
        Long ret = -1l;
        if (res != null) ret = res.getId();
        return new ResponseEntity<Long> (ret, HttpStatus.OK);
    }

    @PostMapping(path = "/hours", consumes = "application/json")
    public String sethours(@RequestBody OpeningHours openingHours){
        return restaurantService.editRestaurantHours(openingHours.getIdrestaurant(), openingHours.getWeekday(),
                openingHours.getOpening(), openingHours.getClosing());
    }

    @PutMapping(path = "/restaurantimage")
    public String editRestaurantimage(@RequestParam Long ID, @RequestParam("file")MultipartFile mpf){
        return restaurantService.updateRestaurantImage(ID, mpf);
    }

    @PutMapping(path = "/restaurants", consumes = {"application/json"})
    public ResponseEntity<Map<String, String>> editRestaurant(@RequestBody Restaurant restaurant){
        String ret = restaurantService.editRestaurant(restaurant);
        if(ret.toLowerCase().contains("error")) return new ResponseEntity<>(Map.of("message", ret), HttpStatus.NOT_ACCEPTABLE);
        else return new ResponseEntity<>(Map.of("message", ret), HttpStatus.OK);
    }

    @PutMapping(path = "/restaurantdelete")
    public ResponseEntity<Map<String, String>> deleteRestaurant(@RequestParam Long restaurantID){
        String ret = restaurantService.deleteRestaurant(restaurantID);
        if(ret.toLowerCase().contains("error")) return new ResponseEntity<>(Map.of("message", ret), HttpStatus.NOT_ACCEPTABLE);
        else return new ResponseEntity<>(Map.of("message", ret), HttpStatus.OK);
    }
}
