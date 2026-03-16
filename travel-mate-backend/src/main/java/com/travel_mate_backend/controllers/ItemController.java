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
    ItemListRepository itemListRepository; //access itemlist data from db

    @Autowired
    ItemRepository itemRepository; //access item data from db

    @PostMapping("{listId}/addItem")
    public ResponseEntity<?> addNewItemByListId(@PathVariable int listId, @RequestBody ItemDTO itemData) throws NoResourceFoundException {//converts JSON payload to ItemDTO, stores in itemData
        ItemList itemList = itemListRepository.findById(listId).orElse(null); //find itemList by id
        if (itemList == null) {
            throw new NoResourceFoundException(HttpMethod.POST, "/" + listId + "addItem", "List with id " + listId + " not found");
        }

       Item newItem = new Item(itemData.getName(), itemData.isCompleted(), itemList); //create new item from itemData (from itemDTO)

        itemList.getItems().add(newItem); //add the new item to the list

        itemRepository.save(newItem); //save item to item Repository (has itemList_id already associated)

        return new ResponseEntity<>(newItem, HttpStatus.CREATED);

    }

    @PutMapping("/editItem/{itemId}") //pathvariable: id of item to edit, from url, requestbody: JSON payload converted to itemData in itemDTO format
    public ResponseEntity<?> editItemById(@PathVariable int itemId, @RequestBody ItemDTO itemData) throws NoResourceFoundException {
        Item item = itemRepository.findById(itemId).orElse(null); //find item in item repo by id
        if (item == null) {
            throw new NoResourceFoundException(HttpMethod.PUT, "/editTripName" + itemId, "The item with id " + itemId + " not found");

        } else {
            //updates item with new data
            item.setName(itemData.getName());
            item.setCompleted(itemData.isCompleted());
        }
        itemRepository.save(item); //save item to item repo
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
