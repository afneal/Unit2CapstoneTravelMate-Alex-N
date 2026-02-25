package com.unit2project.travel_mate_backend.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Day {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String city;

    @JsonFormat(pattern = "MM-dd-yyyy")  //LocalDate in JSON will be formatted as "MM-dd-yyyy")
    private LocalDate date;

    @ManyToOne
    private Trip trip; //stores the trip(parent) this day belongs to, many days can belong to one trip, but a day can only belong to one trip

    @JsonManagedReference //b/c this is the parent side of the relationship, will manage the JSON serialization of the activities list, prevents infinite recursion
    private List<Activity> activities; //stores the list of activities for this day

    public Day() {//default constructor needed by Hibernate to instantiate objects when retrieving from the database
    }

    public Day(String city, LocalDate date, List<Activity> activities) {
        this.city = city;
        this.date = date;
        this.activities = activities;
    }

    public int getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }
}
