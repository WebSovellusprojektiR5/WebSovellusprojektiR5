package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.websovellusprojektiR5.R5_RestAPI.SQLdataModel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    @Autowired
    ImageService imageService;

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
            cats.add(itemCategoryRepo.findByID(i));
        return  cats;
    }

    public List<Item> getItemsByRestaurantID(Long id) {
        return itemRepo.findByRestaurantID(id);
    }

    public List<Item> getActiveItemsByRestaurantID(Long id){
        return itemRepo.findActiveByRestaurantID(id);
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
        if(itemCategoryRepo.findByID(item.getIditemCategory()) == null)
            return "Kategoriaa ei ole olemassa!";
        item.setValid(true);
        itemRepo.save(item);
        return "";
    }

    public String editItemImage(Long id, MultipartFile mpf) {
        if (itemRepo.findById(id).orElse(null) == null) return "Item ei löydy!";
        String imageURL = imageService.UploadImage(mpf);
        if (imageURL == "") return "Kuvan lataaminen pilveen epäonnistui!";
        if (itemRepo.updateItemImage(id, imageURL) > 0)
            return "Kuva lisätty OK! URL: " + imageURL;
        else return "Kuvan lisääminen kantaan epäonnistui!";
    }

    public String editItemCategoryImage(Long id, MultipartFile mpf) {
        if (itemCategoryRepo.findById(id).orElse(null) == null) return "Item kategoriaa ei löydy!";
        String imageURL = imageService.UploadImage(mpf);
        if (imageURL == "") return "Kuvan lataaminen pilveen epäonnistui!";
        if (itemCategoryRepo.updateItemCategoryImage(id, imageURL) > 0)
            return "Kuva lisätty OK! URL: " + imageURL;
        else return "Kuvan lisääminen kantaan epäonnistui!";
    }

    public String editItem (Item item) {
        if(itemRepo.findById(item.getId()).orElse(null) == null)
            return "Error: Item doesn't exist!";

        item.setValid(true);
        itemRepo.save(item);
        return "Item updated OK";
    }

    public String deleteItem (Long itemID) {
        if(itemRepo.findById(itemID).orElse(null) == null)
            return "Error: Item doesn't exist!";

        Item item = itemRepo.getById(itemID);
        item.setValid(false);
        itemRepo.save(item);
        return "Item de-activated OK";
    }

}
