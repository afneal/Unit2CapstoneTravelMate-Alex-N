package com.travel_mate_backend.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private boolean completed;

    @JsonBackReference
    @ManyToOne
    private ItemList itemList;

    public Item() {
    }

    public Item(String name, boolean completed, ItemList itemList) {
        this.name = name;
        this.completed = completed;
        this.itemList = itemList;
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

    public ItemList getItemList() {
        return itemList;
    }

    public void setItemList(ItemList itemList) {
        this.itemList = itemList;
    }
}
