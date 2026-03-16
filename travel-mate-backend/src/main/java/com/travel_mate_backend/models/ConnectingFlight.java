package com.travel_mate_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
public class ConnectingFlight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String connectingCode;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime connectingTime;

    @ManyToOne //many connecting flights can belong to one flight
    @JsonBackReference //connecting flight is child to flight
    private Flight flight;

    public ConnectingFlight() { //default constructor needed by Hibernate to instantiate objects when retrieving from the database
    }

    public ConnectingFlight(String connectingCode, LocalTime connectingTime) {
        this.connectingCode = connectingCode;
        this.connectingTime = connectingTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getConnectingCode() {
        return connectingCode;
    }

    public void setConnectingCode(String connectingCode) {
        this.connectingCode = connectingCode;
    }

    public LocalTime getConnectingTime() {
        return connectingTime;
    }

    public void setConnectingTime(LocalTime connectingTime) {
        this.connectingTime = connectingTime;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }
}
