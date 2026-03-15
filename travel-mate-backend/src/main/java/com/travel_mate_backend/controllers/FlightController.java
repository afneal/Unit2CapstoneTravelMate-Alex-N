package com.travel_mate_backend.controllers;


import com.travel_mate_backend.dto.FlightDTO;
import com.travel_mate_backend.models.Flight;
import com.travel_mate_backend.models.Trip;
import com.travel_mate_backend.repositories.FlightRepository;
import com.travel_mate_backend.repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    FlightRepository flightRepository;

    @Autowired
    TripRepository tripRepository;

    @GetMapping("/{flightId}")
    public ResponseEntity<?> getFlightById(@PathVariable int flightId) throws NoResourceFoundException {
        Flight flight = flightRepository.findById(flightId).orElse(null);
        if (flight == null) {
            throw new NoResourceFoundException(HttpMethod.GET, "/" + flightId, "Flight with id " + flightId + " not found");//404
        } else {
            return new ResponseEntity<>(flight, HttpStatus.OK);
        }
    }

    @PostMapping("/addFlight/{tripId}")
    public ResponseEntity<?> addNewFlight(@PathVariable int tripId, @RequestBody FlightDTO flightData) throws NoResourceFoundException {
        Trip trip = tripRepository.findById(tripId).orElse(null);
        if (trip == null) {
            throw new NoResourceFoundException(HttpMethod.POST, "/" + tripId, "Trip with id " + tripId + " not found");
        }

        Flight flight = new Flight(flightData.getDepartureDate(), flightData.getDepartureCode(), flightData.getDepartureTime(), flightData.getArrivalCode(),
                flightData.getArrivalTime(), new ArrayList<>());
        flight.setTrip(trip);
        flightRepository.save(flight);
        return new ResponseEntity<>(flight, HttpStatus.CREATED);
    }


    @PutMapping("/editFlight/{flightId}")
    public ResponseEntity<?> updateFlightById(@PathVariable int flightId, @RequestBody FlightDTO flightData) throws NoResourceFoundException {
        Flight existingFlight = flightRepository.findById(flightId).orElse(null);
        if (existingFlight == null) {
            throw new NoResourceFoundException(HttpMethod.PUT, "/" + flightId, "The flight with id " + flightId + " not found");
        } else {
            existingFlight.setDepartureDate(flightData.getDepartureDate());
            existingFlight.setDepartureCode(flightData.getDepartureCode());
            existingFlight.setDepartureTime(flightData.getDepartureTime());
            existingFlight.setArrivalCode(flightData.getArrivalCode());
            existingFlight.setArrivalTime(flightData.getArrivalTime());


            //ConnectingFlightsController will edit connecting flights
            flightRepository.save(existingFlight);
        }
        return ResponseEntity.ok(existingFlight);//200

    }

    @DeleteMapping("/deleteFlight/{flightId}")
    public ResponseEntity<?> deleteFlight(@PathVariable int flightId) throws NoResourceFoundException {
        Flight flight = flightRepository.findById(flightId).orElse(null);
        if (flight == null) {
            throw new NoResourceFoundException(HttpMethod.DELETE, "/" + flightId, "Flight with id " + flightId + " not found");
        } else {
            flightRepository.deleteById(flightId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
