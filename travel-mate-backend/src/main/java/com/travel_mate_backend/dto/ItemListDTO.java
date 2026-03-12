package com.travel_mate_backend.dto;

import com.travel_mate_backend.models.Item;

import java.util.List;

public class ItemListDTO {

    private int id;

    private String listType;
    private boolean completed;

    private List<ItemDTO> items;

    public ItemListDTO() {
    }

    //doesnt need to pass Trip as reference like in ItemList entity b/c DTO is just
    //for the data needed by the list. not for database relationships


    public ItemListDTO(String listType, boolean completed, List<ItemDTO> items) {
        this.listType = listType;
        this.completed = completed;
        this.items = items;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getListType() {
        return listType;
    }

    public void setListType(String listType) {
        this.listType = listType;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public List<ItemDTO> getItems() {
        return items;
    }

    public void setItems(List<ItemDTO> items) {
        this.items = items;
    }
}
