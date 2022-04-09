package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepo;
    @Autowired
    OrderItemsRepository orderItemsRepo;
    @Autowired
    ItemRepository itemRepo;
    @Autowired
    RestaurantRepository restaurantRepo;
    @Autowired
    UserRepository userRepo;

    public List<Order> getOrdersByRestaurant(Long restaurantID){
        return orderRepo.findByRestaurant(restaurantID);
    }

    public List<Order> getOrdersByCustomer(Long customerID){
        return orderRepo.findByRestaurant(customerID);
    }

    public String addItemToOrder(OrderItems orderItem){
        if(orderRepo.findById(orderItem.getIdorder()).orElse(null) == null)
            return "Tilausta ei ole olemassa";
        if(itemRepo.findById(orderItem.getIditem()) == null)
            return "Annosta ei ole olemassa";

        orderItemsRepo.save(orderItem);
        return "";
    }

    public String addOrder(Order order){
        if(restaurantRepo.findById(order.getIdrestaurant()).orElse(null) == null)
            return "Ravintolaa ei ole olemassa";
        if(userRepo.findById(order.getIdperson()) == null)
            return "Käyttäjää ei ole olemassa";

        orderRepo.save(order);
        return "";
    }
}
