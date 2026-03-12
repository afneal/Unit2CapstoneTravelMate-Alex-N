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


    public ItemListDTO(int id, String listType, boolean completed, List<ItemDTO> items) {
        this.id = id;
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
