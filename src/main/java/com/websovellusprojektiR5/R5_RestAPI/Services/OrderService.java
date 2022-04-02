package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Order;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.OrderItemsRepository;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.OrderRepository;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepo;
    @Autowired
    OrderItemsRepository orderItemsRepo;

    public List<Order> getOrdersByRestaurant(Long restaurantID){
        return orderRepo.findByRestaurant(restaurantID);
    }
}
