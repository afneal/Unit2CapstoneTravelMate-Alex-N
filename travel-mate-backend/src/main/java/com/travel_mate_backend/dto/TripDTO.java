package com.travel_mate_backend.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

public class TripDTO {

    private int id;
    @NotBlank(message = "Trip name must be between 1 and 100 characters long.")
    @Size(min = 1, max = 100, message = "Trip name must be between 1 and 100 characters long.")
    private String name;

    private String username;
    private List<DayDTO> days;
    private List<ItemListDTO> lists;

    public TripDTO() {
    }

    public TripDTO(String name, String username, List<DayDTO> days, List<ItemListDTO> lists) {
        this.name = name;
        this.username = username;
        this.days = days;
        this.lists = (lists != null) ? lists : new ArrayList<>();
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

    public String getUsername() {
        return username;
    }


    public List<DayDTO> getDays() {
        return days;
    }

    public void setDays(List<DayDTO> days) {
        this.days = days;
    }

    public List<ItemListDTO> getLists() {
        return lists;
    }

    public void setLists(List<ItemListDTO> lists) {
        this.lists = lists;
    }
}
