package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepo;
    @Autowired
    ItemCategoryRepository itemCategoryRepo;
    @Autowired
    RestaurantRepository restaurantRepo;

    @PostConstruct
    public List<Item> getItems(){
        return itemRepo.findAll();
    }
    public List<ItemCategory> getItemCategories(){
        return itemCategoryRepo.findAll();
    }

    public List<ItemCategory> getItemCategoriesByRestaurantID(Long id){
        //List all category ids of given restaurant
        List<Long> catids = itemRepo.findCategoriesByRestaurantID(id);
        //Collect itemcategory list from categoryids
        List<ItemCategory> cats = new ArrayList<>();
        for(Long i : catids)
            cats.add((ItemCategory) itemCategoryRepo.findByID(i));
        return  cats;
    }

    public List<Item> getItemsByRestaurantID(Long id) {
        return itemRepo.findByRestaurantID(id);
    }

    public List<Item> getItemsByRestaurantIDcategoryID (Long rid, Long cid) {
        return itemRepo.findByRestaurantIDitemcategoryID(rid, cid);
    }

    public Boolean addItemCategory (ItemCategory itemCategory) {
        if(itemCategoryRepo.findByCategoryName(itemCategory.getName()) == null) {
            itemCategoryRepo.save(itemCategory);
            return true;
        }
        else return false;
    }

    public String addItem (Item item) {
        if(itemRepo.findByRestaurantIDname(item.getIdrestaurant(), item.getName()).size() > 0) {
            return "Item on jo olemassa!";
        }
        if(restaurantRepo.findById(item.getIdrestaurant()).orElse(null) == null)
            return "Ravintolaa ei ole olemassa";
        if(itemCategoryRepo.findByID(item.getIditemCategory()).size() == 0)
            return "Kategoriaa ei ole olemassa!";

        itemRepo.save(item);
        return "";
    }
}
