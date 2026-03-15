package com.travel_mate_backend.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonFormat //defaults format to YYYY-MM-DD, reformat in frontend
    private LocalDate departureDate;

    private String departureCode;

    @JsonFormat(pattern = "HH:mm")  //LocalTime in JSON will be formatted as "HH:mm"
    private LocalTime departureTime;

    private String arrivalCode;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime arrivalTime;


    @ManyToOne
    @JsonBackReference
    private Trip trip;

    @JsonManagedReference
    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConnectingFlight> connectingFlights;

    public Flight() {
    }

    public Flight(LocalDate departureDate, String departureCode, LocalTime departureTime, String arrivalCode, LocalTime arrivalTime, List<ConnectingFlight> connectingFlights) {
        this.departureDate = departureDate;
        this.departureCode = departureCode;
        this.departureTime = departureTime;
        this.arrivalCode = arrivalCode;
        this.arrivalTime = arrivalTime;
        this.connectingFlights = connectingFlights;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public String getDepartureCode() {
        return departureCode;
    }

    public void setDepartureCode(String departureCode) {
        this.departureCode = departureCode;
    }

    public LocalTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalTime departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalCode() {
        return arrivalCode;
    }

    public void setArrivalCode(String arrivalCode) {
        this.arrivalCode = arrivalCode;
    }

    public LocalTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public List<ConnectingFlight> getConnectingFlights() {
        return connectingFlights;
    }

    public void setConnectingFlights(List<ConnectingFlight> connectingFlights) {
        this.connectingFlights = connectingFlights;
    }
}
