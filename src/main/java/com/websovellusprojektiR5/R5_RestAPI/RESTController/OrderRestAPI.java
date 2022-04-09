package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Order;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.OrderItems;
import com.websovellusprojektiR5.R5_RestAPI.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping(value = "/ordersbyuser", consumes = {"application/json"})
    public ResponseEntity<Map<String, String>> addOrder(Order order){
        String status = orderService.addOrder(order);
        if (status == "") return new ResponseEntity<> (HttpStatus.OK);
        else return new ResponseEntity<>(Map.of("message", status), HttpStatus.NOT_ACCEPTABLE);
    }

    @PostMapping(value = "/orderitem", consumes = {"application/json"})
    public ResponseEntity<Map<String, String>> addItemToOrder(OrderItems item){
        String status = orderService.addItemToOrder(item);
        if (status == "") return new ResponseEntity<> (HttpStatus.OK);
        else return new ResponseEntity<>(Map.of("message", status), HttpStatus.NOT_ACCEPTABLE);
    }
}
