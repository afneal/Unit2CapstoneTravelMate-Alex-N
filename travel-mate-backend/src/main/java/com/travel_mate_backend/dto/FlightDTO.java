package com.travel_mate_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class FlightDTO {

    private int id;

    @JsonFormat
    private LocalDate departureDate;
    private String departureCode;

    @JsonFormat
    private LocalTime departureTime;

    private String arrivalCode;

    @JsonFormat
    private LocalTime arrivalTime;

    private List<ConnectingFlightDTO> connectingFlights;

    public FlightDTO() {
    }

    public FlightDTO(LocalDate departureDate, String departureCode, LocalTime departureTime, String arrivalCode, LocalTime arrivalTime, List<ConnectingFlightDTO> connectingFlights) {
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

    public List<ConnectingFlightDTO> getConnectingFlights() {
        return connectingFlights;
    }

    public void setConnectingFlights(List<ConnectingFlightDTO> connectingFlights) {
        this.connectingFlights = connectingFlights;
    }
}
