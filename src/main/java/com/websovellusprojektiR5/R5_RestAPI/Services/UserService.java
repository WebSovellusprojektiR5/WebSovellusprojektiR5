package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.User;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @PostConstruct
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @PostConstruct
    public User getUserByID(long userID){
        return userRepository.getById(userID);
    }

    @PostConstruct
    public String addRestaurantOwner(User owner){
        if(userRepository.findByUsername(owner.getUsername()) != null){
            return "Käyttäjänimi on jo olemassa.";
        }
        userRepository.save(owner);
        return "Uusi omistaja luotu";
    }

    @PostConstruct
    public String addCustomer(User customer){
        if(userRepository.findByUsername(customer.getUsername()) != null){
            return "Käyttäjänimi on jo olemassa.";
        }
        userRepository.save(customer);
        return "Uusi asiakas luotu";
    }

    @PostConstruct
    public User login(String username, String password){
        User user = userRepository.checkCredentials(username, password);
        if(user == null){
            return null;
        }
        return userRepository.getById(user.getId());
    }
}
