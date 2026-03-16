package com.travel_mate_backend.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

public class TripDTO { //DTO is data transfer object, used to transfer only needed data btwn processes
                        //an API object, what gets sent/received in HTTP requests
                        //use DTO data structure for postman testing

    private int id;
    @NotBlank(message = "Trip name must be between 1 and 100 characters long.")
    @Size(min = 1, max = 100, message = "Trip name must be between 1 and 100 characters long.")
    private String name;

    private String username;
    private List<DayDTO> days;
    private List<ItemListDTO> lists;
    private List<FlightDTO> flights;

    public TripDTO() {
    }

    public TripDTO(String name, String username, List<DayDTO> days, List<ItemListDTO> lists,
                   List<FlightDTO> flights) {
        this.name = name;
        this.username = username;
        this.days = days;
        this.lists = (lists != null) ? lists : new ArrayList<>(); //if lists is not null, assigns this.lists = lists. otherwise, this.lists = new ArrayList
        this.flights = flights;
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

    public List<FlightDTO> getFlights() {
        return flights;
    }

    public void setFlights(List<FlightDTO> flights) {
        this.flights = flights;
    }
}
