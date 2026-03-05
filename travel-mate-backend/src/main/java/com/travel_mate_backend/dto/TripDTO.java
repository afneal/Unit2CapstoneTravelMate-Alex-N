package com.travel_mate_backend.dto;


import com.travel_mate_backend.models.Day;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class TripDTO {

    private int id;
    @NotBlank(message = "Trip name must be between 1 and 100 characters long.")
    @Size(min = 1, max = 100, message = "Trip name must be between 1 and 100 characters long.")
    private String name;

    private String userEmail;
    private List<DayDTO> days;

    public TripDTO() {
    }

    public TripDTO(String name, String userEmail, List<DayDTO> days) {
        this.name = name;
        this.userEmail = userEmail;
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

    public String getUserEmail() {
        return userEmail;
    }


    public List<DayDTO> getDays() {
        return days;
    }

    public void setDays(List<DayDTO> days) {
        this.days = days;
    }
}
