package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Order;
import com.websovellusprojektiR5.R5_RestAPI.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class OrderRestAPI {
    @Autowired
    OrderService orderService;

    @CrossOrigin
    @GetMapping("/ordersbyrestaurant")
    public List<Order> getordersbyrestaurant(@RequestParam Long restaurantID){
        return orderService.getOrdersByRestaurant(restaurantID);
    }

    @CrossOrigin
    @GetMapping("/ordersbyuser")
    public List<Order> getordersbycustomer(@RequestParam Long customerID){
        return orderService.getOrdersByCustomer(customerID);
    }
}
