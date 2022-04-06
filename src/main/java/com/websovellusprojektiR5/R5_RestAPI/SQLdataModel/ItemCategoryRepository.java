package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {
    @Query(value = "SELECT * FROM itemcategory WHERE iditemcategory = ?1", nativeQuery = true)
    ItemCategory findByID(Long iditemcategory);

    @Query(value = "SELECT * FROM itemcategory WHERE name = ?1", nativeQuery = true)
    ItemCategory findByCategoryName(String name);

    @Modifying
    @Transactional
    @Query(value = "UPDATE itemcategory SET thumbnail_url=?2 WHERE iditem = ?1", nativeQuery = true)
    int updateItemCategoryImage(Long itemcategoryId, String url);
}
