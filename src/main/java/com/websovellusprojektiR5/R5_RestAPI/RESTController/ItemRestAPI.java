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
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/categoriesbyrestaurant")
    public List<ItemCategory> getitemcategoriesbyrestaurantid(@RequestParam Long restaurantID) {
        return itemService.getItemCategoriesByRestaurantID(restaurantID);
    }

    @GetMapping("/itemsbyrestaurant")
    public List<Item> getitemsbyrestaurantid(@RequestParam Long restaurantID) {
        return itemService.getActiveItemsByRestaurantID(restaurantID);
    }

    @GetMapping("/itemsbyrestaurantcategory")
    public List<Item> getitemsbyrestaurantidcategoryid(@RequestParam Long restaurantID, @RequestParam Long categoryID) {
        return itemService.getItemsByRestaurantIDcategoryID(restaurantID, categoryID);
    }

    @PostMapping(path = "/categories", consumes = {"application/json"})
    public ItemCategory addItemCategory(@RequestBody ItemCategory category){
        return itemService.addItemCategory(category);
    }

    @PostMapping(path = "/items", consumes = {"application/json"})
    public ResponseEntity<Long> addItem(@RequestBody Item item){
        Item res = itemService.addItem(item);
        Long ret = -1l;
        if (res != null) ret = res.getId();
        return new ResponseEntity<Long> (ret, HttpStatus.OK);
    }

    @PutMapping(path = "/items", consumes = {"application/json"})
    public ResponseEntity<Long> editItem(@RequestBody Item item){
        Item res = itemService.editItem(item);
        Long ret = -1l;
        if (res != null) ret = res.getId();
        return new ResponseEntity<Long> (ret, HttpStatus.OK);
    }

    @PutMapping(path = "/itemdelete", consumes = {"application/json"})
    public ResponseEntity<Map<String, String>> deleteItem(@RequestParam Long id){
        String ret = itemService.deleteItem(id);
        if(ret.toLowerCase().contains("error")) return new ResponseEntity<>(Map.of("message", ret), HttpStatus.NOT_ACCEPTABLE);
        else return new ResponseEntity<>(Map.of("message", ret), HttpStatus.OK);
    }

    @PutMapping(path = "/itemimage")
    public String editRestaurantimage(@RequestParam Long ID, @RequestParam("file") MultipartFile mpf){
        return itemService.updateItemImage(ID, mpf);
    }
}
