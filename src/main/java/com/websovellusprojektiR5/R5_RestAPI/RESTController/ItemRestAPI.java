package com.websovellusprojektiR5.R5_RestAPI.RESTController;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Item;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.ItemCategory;
import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.Restaurant;
import com.websovellusprojektiR5.R5_RestAPI.Services.ItemService;
import com.websovellusprojektiR5.R5_RestAPI.Services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class ItemRestAPI {
    @Autowired
    ItemService itemService;

    @GetMapping("/items")
    public List<Item> getitems() {
        return itemService.getItems();
    }

    @GetMapping("/categories")
    public List<ItemCategory> getitemcategories() {return itemService.getItemCategories(); }

    @GetMapping("/itemsbyrestaurant")
    public List<Item> getitemsbyrestaurantid(@RequestParam Long restaurantID) {
        return itemService.getItemsByRestaurantID(restaurantID);
    }

    @GetMapping("/itemsbyrestaurantcategory")
    public List<Item> getitemsbyrestaurantidcategoryid(@RequestParam Long restaurantID, @RequestParam Long categoryID) {
        return itemService.getItemsByRestaurantIDcategoryID(restaurantID, categoryID);
    }

    @PostMapping(path = "/categories", consumes = {"application/json"})
    public ResponseEntity<Map<String, String>> addItemCategory(@RequestBody ItemCategory category){
        if (itemService.addItemCategory(category)) return new ResponseEntity<> (HttpStatus.OK);
        else return new ResponseEntity<>(Map.of("message", "Kategoria on jo olemassa!"), HttpStatus.NOT_ACCEPTABLE);
    }

    @PostMapping(path = "/items", consumes = {"application/json"})
    public ResponseEntity<Map<String, String>> addItem(@RequestBody Item item){
        String status = itemService.addItem(item);
        if (status == "") return new ResponseEntity<> (HttpStatus.OK);
        else return new ResponseEntity<>(Map.of("message", status), HttpStatus.NOT_ACCEPTABLE);
    }
}
