package com.websovellusprojektiR5.R5_RestAPI.SQLdataModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {
    @Query(value = "SELECT * FROM itemcategory WHERE iditemcategory = ?1", nativeQuery = true)
    List<ItemCategory> findByID(Long iditemcategory);

    @Query(value = "SELECT * FROM itemcategory WHERE name = ?1", nativeQuery = true)
    ItemCategory findByCategoryName(String name);
}
