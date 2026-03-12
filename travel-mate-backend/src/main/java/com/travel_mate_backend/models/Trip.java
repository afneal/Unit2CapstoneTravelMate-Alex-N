package com.travel_mate_backend.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @JsonBackReference
    @ManyToOne
    private User user; //stores the user who created this trip, many trips can belong to one user, but a trip can only belong to one user

    @JsonManagedReference
    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true) //one trip can have many days, mappedBy points to the field in Day that owns the relationship, cascade ALL means all operations on Trip will cascade to its days, orphanRemoval means if a day is removed from the trip's list, it will be deleted from the database
    private List<Day> days; //stores the list of days for this trip

    @JsonManagedReference
    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
    private List<ItemList> lists;

    public Trip() {//default constructor needed by Hibernate to instantiate objects when retrieving from the database
    }

    public Trip(String name, User user, List<Day> days) {
        this.name = name;
        this.user = user;
        this.days = days;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Day> getDays() {
        return days;
    }

    public void setDays(List<Day> days) {
        this.days = days;
    }

    public List<ItemList> getLists() {
        return lists;
    }

    public void setLists(List<ItemList> lists) {
        this.lists = lists;
    }
}
