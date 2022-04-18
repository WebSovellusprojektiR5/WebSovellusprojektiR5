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

    public Order getActiveOrderIdByRestaurantId(Long restaurantID) {
        return orderRepo.findActiveByRestaurantId(restaurantID);
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
            return "Error: Order doesn't exist";
        if(itemRepo.findById(orderItem.getIditem()).orElse(null) == null)
            return "Error: Item doesn't exist";

        orderItemsRepo.save(orderItem);
        return "Item added OK";
    }

    public Order addOrder(Order order){
        if(restaurantRepo.findById(order.getIdrestaurant()).orElse(null) == null)
            return null;
        if(userRepo.findById(order.getIdperson()).orElse(null) == null)
            return null;
        return orderRepo.save(order);
    }

    public List<OrderItems> getItemsInOrder(Long orderID){
        return orderItemsRepo.findItemsInOrder(orderID);
    }
}
