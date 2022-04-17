package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.*;
import com.websovellusprojektiR5.R5_RestAPI.Security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepo;
    @Autowired
    UserRoleRepository userRoleRepo;
    @Autowired
    PasswordEncoder pwdEncoder;
    @Autowired
    RestaurantRepository restaurantRepo;

    @PostConstruct
    public List<User> getUsers(){
        return userRepo.findAll();
    }
    public List<UserRole> getUserRoles(){
        return userRoleRepo.findAll();
    }

    public User getUserByID(Long userID){
        return userRepo.findByID(userID);
    }
    public User getUserByName(String userName) { return userRepo.findByUsername(userName); }
    public UserRole getUserRoleByID(Long userRoleID){
        return userRoleRepo.findByID(userRoleID);
    }

    public String addUser(User user){
        if(userRepo.findByUsername(user.getUsername()) != null){
            return "Error: User already exists!";
        }
        user.setActive(true);
        user.setPassword(pwdEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return "New user created OK";
    }

    public String editUser(User user){
        if(userRepo.findById(user.getId()).orElse(null) == null)
            return "Error: User doesn't exist!";

        user.setPassword(pwdEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return "User updated OK";
    }

    public String deleteUser(Long userID){
        if(userRepo.findById(userID).orElse(null) == null)
            return "Error: User doesn't exist!";

        if(restaurantRepo.findByOwnerID(userID).size() > 0)
            return "Error: Cannot delete account! This account is linked to active restaurants!";

        User user = userRepo.getById(userID);
        user.setFirstname("");
        user.setLastname("");
        user.setAddress1("");
        user.setAddress2("");
        user.setCity("");
        user.setPhone("");
        user.setActive(false);
        userRepo.save(user);
        return "User data deleted OK";
    }

    public User login(String username, String password){
        return userRepo.checkCredentials(username, password);
    }
}
