package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

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

    public Order getOrderByOrderID(Long orderID){
        return orderRepo.findOrderById(orderID);
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
        if(orderItemsRepo.getOrderItem(orderItem.getIdorder(), orderItem.getIditem()) != null){
            orderItem.setId(orderItemsRepo.getOrderItem(orderItem.getIdorder(), orderItem.getIditem()).getId());
        }
        orderItemsRepo.save(orderItem);
        return "Item added OK";
    }

    public String completeOrder(Long orderID, Double price){
        if(orderRepo.findById(orderID).orElse(null) == null)
            return "Error: Order doesn't exist";

        Order order = orderRepo.findOrderById(orderID);
        order.setCompleted_time(new Timestamp(System.currentTimeMillis()));
        order.setPrice(price);
        orderRepo.save(order);
        return "Order completed OK";
    }

    public String deleteItemFromOrder(Long orderID, Long itemID){
        if(orderItemsRepo.getOrderItem(orderID, itemID) == null){
            return "Error: No such item in order";
        }
        orderItemsRepo.delete(orderItemsRepo.getOrderItem(orderID, itemID));
        return "Item deleted OK";
    }

    public Order addOrder(Order order){
        if(restaurantRepo.findById(order.getIdrestaurant()).orElse(null) == null)
            return null;
        if(userRepo.findById(order.getIdperson()).orElse(null) == null)
            return null;
        order = setNullToString(order);
        return orderRepo.save(order);
    }

    public String deleteOrder(Long orderID){
        if(orderRepo.findById(orderID).orElse(null) == null)
            return "Error: Order doesn't exist";
        if(getItemsInOrder(orderID).size() > 0)
            return "Error: Order has items in it";

        orderRepo.deleteById(orderID);
        return "Order deleted OK";
    }

    public List<OrderItems> getItemsInOrder(Long orderID){
        return orderItemsRepo.findItemsInOrder(orderID);
    }

    //set null fields to empty strings
    private Order setNullToString(Order order){
        if(order.getComment() == null){
            order.setComment("");
        }
        if(order.getAddress1() == null){
            order.setAddress1("");
        }
        if(order.getAddress2() == null){
            order.setAddress2("");
        }
        return order;
    }
}
