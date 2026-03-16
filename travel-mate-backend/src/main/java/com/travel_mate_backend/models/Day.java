package com.travel_mate_backend.models;


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

    @JsonFormat  //defaults format to YYYY-MM-DD, reformat in frontend
    private LocalDate date;

    @ManyToOne
    @JsonBackReference //day is child to parent trip
    private Trip trip; //stores the trip(parent) this day belongs to, many days can belong to one trip, but a day can only belong to one trip

    @JsonManagedReference //day is parent to child activity list, serializes children (convert JSON object to JSON string)
    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, orphanRemoval = true) //one day can have many activities,  cascade all operations on day to its activities,
    //orphanRemoval: if an activity is removed from the day's list, it will be deleted from the database
    //foreign key day_id used in activity table

    private List<Activity> activities; //stores the list of activities for this day

    public Day() { //default constructor needed by Hibernate to instantiate objects when retrieving from the database
    }

    public Day(String city, LocalDate date, List<Activity> activities) {
        this.city = city;
        this.date = date;
        this.activities = activities;
    }
    //used to add a day to a trip in controller
    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    //getters and setters
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
