package com.travel_mate_backend.controllers;


import com.travel_mate_backend.dto.ConnectingFlightDTO;
import com.travel_mate_backend.models.ConnectingFlight;
import com.travel_mate_backend.models.Flight;
import com.travel_mate_backend.repositories.ConnectingFlightRepository;
import com.travel_mate_backend.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestController
@RequestMapping("/api/connectingFlights")
public class ConnectingFlightController {

    @Autowired
    ConnectingFlightRepository connectingFlightRepository;

    @Autowired
    FlightRepository flightRepository;

    @PostMapping("/addConnectingFlight/{flightId}")

    public ResponseEntity<?> addNewConnectingFlight(@PathVariable int flightId, @RequestBody ConnectingFlightDTO connectingFlightData) throws NoResourceFoundException {
        ConnectingFlight connectingFlight = new ConnectingFlight(connectingFlightData.getConnectingCode(), connectingFlightData.getConnectingTime());
        Flight flight = flightRepository.findById(flightId).orElse(null);
        if (flight == null) {
            throw new NoResourceFoundException(HttpMethod.POST, "/" + flightId, "Flight with id " + flightId + " not found"); // 404
        }
        connectingFlight.setFlight(flight);
        connectingFlightRepository.save(connectingFlight);
        return new ResponseEntity<>(connectingFlight, HttpStatus.CREATED);

    }

    @PutMapping("/editConnectingFlight/{connectingFlightId}")
    public ResponseEntity<?> updateConnectingFlightById(@PathVariable int connectingFlightId, @RequestBody ConnectingFlightDTO connectingFlightData) throws NoResourceFoundException {
        ConnectingFlight existingConnectingFlight = connectingFlightRepository.findById(connectingFlightId).orElse(null);
        if (existingConnectingFlight == null) {
            throw new NoResourceFoundException(HttpMethod.PUT, "/" + connectingFlightId, "The connecting flight with id " + connectingFlightId + " not found");
        } else {
            existingConnectingFlight.setConnectingCode(connectingFlightData.getConnectingCode());
            existingConnectingFlight.setConnectingTime(connectingFlightData.getConnectingTime());

        }
        connectingFlightRepository.save(existingConnectingFlight);
        return ResponseEntity.ok(existingConnectingFlight);

    }

    @DeleteMapping("/deleteConnectingFlight/{connectingFlightId}")
//deleing by unique connectingflight id so don't need relationship to mainflight etc
    public ResponseEntity<?> deleteConnectingFlight(@PathVariable int connectingFlightId) throws NoResourceFoundException {
        ConnectingFlight connectingFlight = connectingFlightRepository.findById(connectingFlightId).orElse(null);
        if (connectingFlight == null) {
            throw new NoResourceFoundException(HttpMethod.DELETE, "/" + connectingFlightId, "Connecting flight with id " + connectingFlightId + " not found"); // 404, resource not found, activity with the specified id does not exist in the database
        } else {
            connectingFlightRepository.deleteById(connectingFlightId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204, successful deletion, no content to return

        }


    }
}



