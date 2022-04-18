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
    public List<Order> getordersbyrestaurant(@RequestParam Long restaurantID, @RequestParam int first_order,
                                             @RequestParam int limit){
        return orderService.getOrdersByRestaurantLimit(restaurantID, first_order, limit);
    }

    @CrossOrigin
    @GetMapping("/ordersbyuser")
    public List<Order> getordersbycustomer(@RequestParam Long customerID, @RequestParam int first_order,
                                           @RequestParam int limit){
        return orderService.getOrdersByCustomerLimit(customerID, first_order, limit);
    }

    @PostMapping(value = "/ordersbyuser", consumes = {"application/json"})
    public Order addOrder(Order order){
        return orderService.addOrder(order);
    }

    @PostMapping(value = "/orderitem", consumes = {"application/json"})
    public ResponseEntity<Map<String, String>> addItemToOrder(@RequestBody OrderItems item){
        String ret = orderService.addItemToOrder(item);
        if(ret.toLowerCase().contains("error")) return new ResponseEntity<>(Map.of("message", ret), HttpStatus.NOT_ACCEPTABLE);
        else return new ResponseEntity<>(Map.of("message", ret), HttpStatus.OK);
    }

    @PutMapping(value = "/orderitem", consumes = {"application/json"})
    public ResponseEntity<Map<String, String>> updateItemInOrder(@RequestBody OrderItems item){
        String ret = orderService.addItemToOrder(item);
        if(ret.toLowerCase().contains("error")) return new ResponseEntity<>(Map.of("message", ret), HttpStatus.NOT_ACCEPTABLE);
        else return new ResponseEntity<>(Map.of("message", ret), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/orderitem")
    public List<OrderItems> getItemsInOrder(@RequestParam Long orderID){
        return  orderService.getItemsInOrder(orderID);
    }

    @CrossOrigin
    @DeleteMapping(value = "/orderitem")
    public ResponseEntity<Map<String, String>> deleteItemFromOrder(@RequestParam Long orderID, @RequestParam Long itemID) {
        String ret = orderService.deleteItemFromOrder(orderID, itemID);
        if (ret.toLowerCase().contains("error"))
            return new ResponseEntity<>(Map.of("message", ret), HttpStatus.NOT_ACCEPTABLE);
        else return new ResponseEntity<>(Map.of("message", ret), HttpStatus.OK);
    }
}
