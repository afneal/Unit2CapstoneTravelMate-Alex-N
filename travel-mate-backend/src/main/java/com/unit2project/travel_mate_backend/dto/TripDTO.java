package com.unit2project.travel_mate_backend.dto;


import com.unit2project.travel_mate_backend.models.Day;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class TripDTO {

    private int id;
    @NotBlank(message = "Trip name must be between 1 and 100 characters long.")
    @Size(min = 1, max = 100, message = "Trip name must be between 1 and 100 characters long.")
    private String name;

    private int userId;
    private List<Day> days;

    public TripDTO() {
    }

    public TripDTO(String name, int userId, List<Day> days) {
        this.name = name;
        this.userId = userId;
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

    public int getUserId() {
        return userId;
    }


    public List<Day> getDays() {
        return days;
    }

    public void setDays(List<Day> days) {
        this.days = days;
    }
}
