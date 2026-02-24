package com.unit2project.travel_mate_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalTime;

@Entity
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @JsonFormat(pattern = "HH:mm")  //LocalTime in JSON will be formatted as "HH:mm"
    private LocalTime time;
    @Lob                                    //large object, for longer text
    private String notes;

    @ManyToOne //many activities can belong to one day, does not need mappedBy since this is the owning side of the relationship and will have the foreign key
    @JsonBackReference  //prevents infinite recursion during JSON serialization
    private Day day;    //stores the day(parent) this activity belongs to

    public Activity() {//default constructor needed by Hibernate to instantiate objects when retrieving from the database
    }

    public Activity(String name, LocalTime time, String notes) {
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

    public LocalTime getTime() {
        return time;
    }

    public String getNotes() {
        return notes;
    }

}
