package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.User;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.UserRepository;
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
    PasswordEncoder pwdEncoder;

    @PostConstruct
    public List<User> getUsers(){
        return userRepo.findAll();
    }

    public User getUserByID(long userID){
        return userRepo.getById(userID);
    }
    public User getUserByName(String userName) { return userRepo.findByUsername(userName); }

    public String addUser(User user){
        if(userRepo.findByUsername(user.getUsername()) != null){
            return "Käyttäjänimi on jo olemassa.";
        }
        user.setPassword(pwdEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return "Uusi käyttäjä luotu";
    }

    public User login(String username, String password){
        return userRepo.checkCredentials(username, password);
    }
}
