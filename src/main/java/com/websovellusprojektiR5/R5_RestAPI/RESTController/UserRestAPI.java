package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.User;
import com.websovellusprojektiR5.R5_RestAPI.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRestAPI {
    @Autowired
    UserService userService;

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
