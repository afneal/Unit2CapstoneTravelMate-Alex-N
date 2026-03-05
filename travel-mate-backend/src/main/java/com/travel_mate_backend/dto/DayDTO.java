package com.travel_mate_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.travel_mate_backend.models.Activity;
import jakarta.validation.constraints.Pattern;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.List;

public class DayDTO {

    private int id;
    private String city;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private List<ActivityDTO> activities;

    public DayDTO() {
    }

    public DayDTO(String city, LocalDate date, List<ActivityDTO> activities) {
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

    public List<ActivityDTO> getActivities() {
        return activities;
    }

    public void setActivities(List<ActivityDTO> activities) {
        this.activities = activities;
    }
}
