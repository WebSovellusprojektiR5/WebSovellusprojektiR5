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

    //Get <limit> orders by <restaurantID> starting from <first_order>
    public List<Order> getOrdersByRestaurantLimit(Long restaurantID, int first_order, int limit){
        return orderRepo.findByRestaurantLimit(restaurantID, first_order, limit);
    }

    public List<Order> getOrdersByCustomer(Long customerID){
        return orderRepo.findByCustomer(customerID);
    }

    //Get <limit> orders by <customerID> starting from <first_order>
    public List<Order> getOrdersByCustomerLimit(Long customerID, int first_order, int limit){
        return orderRepo.findByCustomerLimit(customerID, first_order, limit);
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

    public List<OrderItems> getItemsInOrder(Long orderID){
        return orderItemsRepo.findItemsInOrder(orderID);
    }
}
