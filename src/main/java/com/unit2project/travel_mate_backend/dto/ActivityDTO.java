package com.unit2project.travel_mate_backend.dto;


import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;

public class ActivityDTO {

    private int id;
    @NotBlank(message = "Activity name must be between 1 and 100 characters long.")
    private String name;

    private int time;
    private String notes;

    public ActivityDTO() {
    }

    public ActivityDTO(String name, int time, String notes) {
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

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
