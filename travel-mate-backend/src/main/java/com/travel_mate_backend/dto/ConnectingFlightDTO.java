package com.travel_mate_backend.dto;


import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalTime;

public class ConnectingFlightDTO { //DTO is data transfer object, used to transfer data btwn processes
                                     //an API object, what gets sent/received in HTTP requests
                                     //use DTO data structure for postman testing

    private int id;
    private String connectingCode;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime connectingTime;

    public ConnectingFlightDTO() {

    }

    public ConnectingFlightDTO(String connectingCode, LocalTime connectingTime) {
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
}
