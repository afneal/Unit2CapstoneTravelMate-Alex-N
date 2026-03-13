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

    @ManyToOne
    @JsonBackReference
    private MainFlight mainFlight;

    public ConnectingFlight() {
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

    public MainFlight getMainFlights() {
        return mainFlight;
    }

    public void setMainFlights(MainFlight mainFlight) {
        this.mainFlight = mainFlight;
    }
}
