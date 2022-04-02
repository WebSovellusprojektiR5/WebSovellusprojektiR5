package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.User;
import com.websovellusprojektiR5.R5_RestAPI.Security.SecurityService;
import com.websovellusprojektiR5.R5_RestAPI.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserRestAPI {
    @Autowired
    UserService userService;
    @Autowired
    SecurityService securityService;

    @PostMapping(path = "/users", consumes = {"application/json"})
    public String addUser(@RequestBody User newUser){
        return userService.addUser(newUser);
    }

    //@PostMapping(path = "/login")
    //public User login(String username, String password){
    //    return userService.login(username, password);
    //}

    @PostMapping(path = "/loginbasic")
    public ResponseEntity<Map<String, String>> loginBasic(@RequestHeader("Authorization") String basicAuthHeader){

        String token = securityService.checkBasicAuthentication(basicAuthHeader);
        if(token == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials){
        if(credentials == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        String token = securityService.checkAuthentication(credentials.get("username"), credentials.get("password"));
        if(token == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
    }

    //Modaa tarpeisiin sopivaksi
    @GetMapping(path = "/private")
    public ResponseEntity<User> getPrivate(@RequestHeader("Authorization") String bearer){
        User u = securityService.validateBearerToken(bearer);
        if (u == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(u, HttpStatus.OK);
    }
}
