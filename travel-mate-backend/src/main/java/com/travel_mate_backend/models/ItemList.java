package com.travel_mate_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
public class ItemList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String listType; //reminders or packing list

    private boolean completed;

    @ManyToOne
    @JsonBackReference
    private Trip trip;
    //foreign key relationship
    //define relationship to each trip, each ItemList belongs to a Trip

    @JsonManagedReference
    @OneToMany(mappedBy = "itemList", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items;


    public ItemList() {
    }


    public ItemList(String listType, boolean completed, Trip trip) {
        this.listType = listType;
        this.completed = completed;
        this.trip = trip;
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

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
