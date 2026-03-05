package com.travel_mate_backend.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalTime;

public class ActivityDTO {

    private int id;
    @NotBlank(message = "Activity name must be between 1 and 100 characters long.")
    @Size(min = 1, max = 100, message = "Activity name must be between 1 and 100 characters long.")
    private String name;

    @JsonFormat(pattern = "HH:mm")  //LocalTime in JSON will be formatted as "HH:mm"
    private LocalTime time;
    private String notes;

    public ActivityDTO() {
    }

    public ActivityDTO(String name, LocalTime time, String notes) {
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

    public void setName(String name) {
        this.name = name;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
