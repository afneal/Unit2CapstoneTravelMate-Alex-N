package com.travel_mate_backend.dto;

import com.travel_mate_backend.models.ItemList;

public class ItemDTO {

    private int id;

    private String name;
    private boolean completed;


    public ItemDTO( String name, boolean completed) {
        this.name = name;
        this.completed = completed;

    }

    public ItemDTO() {

    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }


}
