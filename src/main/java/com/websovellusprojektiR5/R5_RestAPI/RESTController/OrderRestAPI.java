package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Order;
import com.websovellusprojektiR5.R5_RestAPI.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderRestAPI {
    @Autowired
    OrderService orderService;

    @PostMapping("/ordersbyrestaurant")
    public List<Order> getordersbyrestaurant(@RequestParam Long restaurantID){
        return orderService.getOrdersByRestaurant(restaurantID);
    }
}
