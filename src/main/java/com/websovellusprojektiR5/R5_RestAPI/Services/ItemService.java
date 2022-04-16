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

    public ItemCategory addItemCategory (ItemCategory itemCategory) {
        ItemCategory cat = itemCategoryRepo.findByCategoryName(itemCategory.getName());
        if(cat == null) {
            cat = itemCategoryRepo.save(itemCategory);
        }
        return cat;
    }

    public Item addItem (Item item) {
        item.setActive(true);
        return itemRepo.save(item);
    }

    public String updateItemImage(Long id, MultipartFile mpf) {
        if (itemRepo.findById(id).orElse(null) == null) return "Item not found!";
        String imageURL = imageService.UploadImage(mpf);
        if (imageURL == "") return "Error: Uploading picture to Cloudinary failed!";
        if (itemRepo.updateItemImage(id, imageURL) > 0)
            return "Picture updated OK! URL: " + imageURL;
        else return "Error: Updating picture URL to database failed!";
    }

    public String updateItemCategoryImage(Long id, MultipartFile mpf) {
        if (itemCategoryRepo.findById(id).orElse(null) == null) return "Item category not found!";
        String imageURL = imageService.UploadImage(mpf);
        if (imageURL == "") return "Error: Uploading picture to Cloudinary failed!";
        if (itemCategoryRepo.updateItemCategoryImage(id, imageURL) > 0)
            return "Picture updated OK! URL: " + imageURL;
        else return "Error: Updating picture URL to database failed!";
    }

    public String editItem (Item item) {
        if(itemRepo.findById(item.getId()).orElse(null) == null)
            return "Error: Item doesn't exist!";

        item.setActive(true);
        itemRepo.save(item);
        return "Item updated OK";
    }

    public String deleteItem (Long itemID) {
        if(itemRepo.findById(itemID).orElse(null) == null)
            return "Error: Item doesn't exist!";

        Item item = itemRepo.getById(itemID);
        item.setActive(false);
        itemRepo.save(item);
        return "Item de-activated OK";
    }

}
