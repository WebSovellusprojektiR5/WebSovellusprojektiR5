package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.User;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.UserRepository;
import com.websovellusprojektiR5.R5_RestAPI.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
public class UserRestAPI {

    @Autowired
    UserService userService;

    @CrossOrigin
    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }
    @GetMapping("/users/{userId}")
    public User getUser(@PathVariable Long userID){
        return userService.getUserByID(userID);
    }

    @PostMapping(path = "/addowner", consumes = {"application/json"})
    public String addOwner(@RequestBody User newOwner){
        return userService.addRestaurantOwner(newOwner);
    }

    @PostMapping(path = "/adduser", consumes = {"application/json"})
    public String addCustomer(@RequestBody User newCustomer) {
        return userService.addCustomer(newCustomer);
    }

    @PostMapping(path = "/login")
    public User login(String username, String password){
        return userService.login(username, password);
    }
}
