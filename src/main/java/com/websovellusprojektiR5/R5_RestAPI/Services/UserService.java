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

    public String addUser(User user){
        if(userRepo.findByUsername(user.getUsername()) != null){
            return "Error: User already exists!";
        }
        user.setPassword(pwdEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return "New user created OK";
    }

    public User login(String username, String password){
        return userRepo.checkCredentials(username, password);
    }
}
