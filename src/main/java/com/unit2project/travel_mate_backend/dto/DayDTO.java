package com.unit2project.travel_mate_backend.dto;

import com.unit2project.travel_mate_backend.models.Activity;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.List;

public class DayDTO {

    private int id;
    private String city;
    private LocalDate date;
    private List<Activity> activities;

    public DayDTO() {
    }

    public DayDTO(String city, LocalDate date, List<Activity> activities) {
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
