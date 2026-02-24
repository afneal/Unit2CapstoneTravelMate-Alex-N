package com.unit2project.travel_mate_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private int time;
    @Lob                                    //large object, for longer text
    private String notes;

//    @ManyToOne //many activities can belong to one day, does not need mappedBy since this is the owning side of the relationship and will have the foreign key
//    @JsonBackReference  //prevents infinite recursion during JSON serialization
//    private Day day;    //stores the day(parent) this activity belongs to

    public Activity() {
    }

    public Activity(String name, int time, String notes) {
        this.name = name;
        this.time = time;
        this.notes = notes;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getActivityTime() {
        return time;
    }

    public String getActivityNotes() {
        return notes;
    }

}
