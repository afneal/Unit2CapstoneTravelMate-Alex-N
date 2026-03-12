package com.travel_mate_backend.repositories;

import com.travel_mate_backend.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository <Item, Integer> {
    List<Item> findByItemListId(int listId);
}
