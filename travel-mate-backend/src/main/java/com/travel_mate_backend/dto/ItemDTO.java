package com.travel_mate_backend.dto;

import com.travel_mate_backend.models.ItemList;

public class ItemDTO {

    private int id;

    private String name;
    private boolean completed;


    public ItemDTO(int id, String name, boolean completed) {
        this.id = id;
        this.name = name;
        this.completed = completed;

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
