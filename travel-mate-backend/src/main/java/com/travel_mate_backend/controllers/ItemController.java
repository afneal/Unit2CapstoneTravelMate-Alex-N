package com.travel_mate_backend.controllers;


import com.travel_mate_backend.dto.ActivityDTO;
import com.travel_mate_backend.dto.ItemDTO;
import com.travel_mate_backend.models.Activity;
import com.travel_mate_backend.models.Day;
import com.travel_mate_backend.models.Item;
import com.travel_mate_backend.models.ItemList;
import com.travel_mate_backend.repositories.ItemListRepository;
import com.travel_mate_backend.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
public class ItemController {

    @Autowired
    ItemListRepository itemListRepository;

    @Autowired
    ItemRepository itemRepository;

    @PostMapping("{listId}/addItem")
    public ResponseEntity<?> addNewItemByListId(@PathVariable int listId, @RequestBody ItemDTO itemData) throws NoResourceFoundException {
        ItemList itemList = itemListRepository.findById(listId).orElse(null);
        if (itemList == null) {
            throw new NoResourceFoundException(HttpMethod.POST, "/" + listId + "addItem", "List with id " + listId + " not found");
        }

        Item newItem = new Item();
        newItem.setName(itemData.getName());
        newItem.setCompleted(false);
        newItem.setItemList(itemList);

        itemRepository.save(newItem);

        return new ResponseEntity<>(newItem, HttpStatus.CREATED);

    }

    @PutMapping("/editItem/{itemId}")
    public ResponseEntity<?> editItemById(@PathVariable int itemId, @RequestBody ItemDTO itemData) throws NoResourceFoundException {
        Item item = itemRepository.findById(itemId).orElse(null);
        if (item == null) {
            throw new NoResourceFoundException(HttpMethod.PUT, "/editTripName" + itemId, "The item with id " + itemId + " not found");

        } else {
            item.setName(itemData.getName());
            item.setCompleted(itemData.isCompleted());
        }
        itemRepository.save(item);
        return ResponseEntity.ok(item);

    }


    @DeleteMapping("/deleteItem/{itemId}")
    public ResponseEntity<?> deleteItemById(@PathVariable int itemId) throws NoResourceFoundException {
        Item item = itemRepository.findById(itemId).orElse(null);
        if (item == null) {
            throw new NoResourceFoundException(HttpMethod.DELETE, "/deleteIem" + itemId, "Item with id " + itemId + " not found"); // 404, resource not found, item with the specified id does not exist in the database
        } else {
            itemRepository.deleteById(itemId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
