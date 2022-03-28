package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.User;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepo;

    @PostConstruct
    public List<User> getUsers(){
        return userRepo.findAll();
    }

    public User getUserByID(long userID){
        return userRepo.getById(userID);
    }

    public String addRestaurantOwner(User owner){
        if(userRepo.findByUsername(owner.getUsername()) != null){
            return "Käyttäjänimi on jo olemassa.";
        }
        userRepo.save(owner);
        return "Uusi omistaja luotu";
    }

    public String addCustomer(User customer){
        if(userRepo.findByUsername(customer.getUsername()) != null){
            return "Käyttäjänimi on jo olemassa.";
        }
        userRepo.save(customer);
        return "Uusi asiakas luotu";
    }

    public User login(String username, String password){
        User user = userRepo.checkCredentials(username, password);
        if(user == null){
            return null;
        }
        return userRepo.getById(user.getId());
    }
}
