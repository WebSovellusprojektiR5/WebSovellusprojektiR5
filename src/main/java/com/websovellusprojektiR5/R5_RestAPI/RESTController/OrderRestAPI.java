package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Item;
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
    public List<Order> getordersbyrestaurant(@RequestParam Long restaurantID, @RequestParam int first_order,
                                             @RequestParam int limit){
        return orderService.getOrdersByRestaurantLimit(restaurantID, first_order, limit);
    }

    @GetMapping("/activeorderbyrestaurant")
    public ResponseEntity<Order> getactiveorderidbyrestaurant(@RequestParam Long restaurantID) {
        Order res = orderService.getActiveOrderIdByRestaurantId(restaurantID);
        return new ResponseEntity<Order> (res, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/ordersbyuser")
    public List<Order> getordersbycustomer(@RequestParam Long customerID, @RequestParam int first_order,
                                           @RequestParam int limit){
        return orderService.getOrdersByCustomerLimit(customerID, first_order, limit);
    }

    @PostMapping(value = "/ordersbyuser", consumes = {"application/json"})
    public ResponseEntity<Long> addOrder(@RequestBody Order order){
        Order res = orderService.addOrder(order);
        Long ret = -1l;
        if (res != null) ret = res.getId();
        return new ResponseEntity<Long> (ret, HttpStatus.OK);
    }

    @PostMapping(value = "/orderitem", consumes = {"application/json"})
    public ResponseEntity<Map<String, String>> addItemToOrder(@RequestBody OrderItems item){
        String ret = orderService.addItemToOrder(item);
        if(ret.toLowerCase().contains("error")) return new ResponseEntity<>(Map.of("message", ret), HttpStatus.NOT_ACCEPTABLE);
        else return new ResponseEntity<>(Map.of("message", ret), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/orderitem")
    public List<OrderItems> getItemsInOrder(@RequestParam Long orderID){
        return  orderService.getItemsInOrder(orderID);
    }
}
