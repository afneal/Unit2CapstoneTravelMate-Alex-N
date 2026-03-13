package com.travel_mate_backend.controllers;


import com.travel_mate_backend.dto.DayDTO;
import com.travel_mate_backend.dto.MainFlightDTO;
import com.travel_mate_backend.models.Day;
import com.travel_mate_backend.models.MainFlight;
import com.travel_mate_backend.models.Trip;
import com.travel_mate_backend.repositories.MainFlightRepository;
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
public class MainFlightController {

    @Autowired
    MainFlightRepository mainFlightRepository;

    @Autowired
    TripRepository tripRepository;

    @GetMapping("/{mainFlightId}")
    public ResponseEntity<?> getMainFlightById(@PathVariable int mainFlightId) throws NoResourceFoundException {
        MainFlight mainFlight = mainFlightRepository.findById(mainFlightId).orElse(null);
        if (mainFlight == null) {
            throw new NoResourceFoundException(HttpMethod.GET, "/" + mainFlightId, "Flight with id " + mainFlightId + " not found");//404
        } else {
            return new ResponseEntity<>(mainFlight, HttpStatus.OK);
        }
    }

    @PostMapping("/addMainFlight/{tripId}")
    public ResponseEntity<?> addNewMainFlight(@PathVariable int tripId, @RequestBody MainFlightDTO mainFlightData) throws NoResourceFoundException {
        Trip trip = tripRepository.findById(tripId).orElse(null);
        if (trip == null) {
            throw new NoResourceFoundException(HttpMethod.POST, "/" + tripId, "Trip with id " + tripId + " not found");
        }

        MainFlight mainFlight = new MainFlight(mainFlightData.getDepartureCode(), mainFlightData.getDepartureTime(), mainFlightData.getArrivalCode(),
                mainFlightData.getArrivalTime(), new ArrayList<>());
        mainFlight.setTrip(trip);
        mainFlightRepository.save(mainFlight);
        return new ResponseEntity<>(mainFlight, HttpStatus.CREATED);
    }


    @PutMapping("/editMainFlight/{mainFlightId}")
    public ResponseEntity<?> updateMainFlightById(@PathVariable int mainFlightId, @RequestBody MainFlightDTO mainFlightData) throws NoResourceFoundException {
        MainFlight existingMainFlight = mainFlightRepository.findById(mainFlightId).orElse(null);
        if (existingMainFlight == null) {
            throw new NoResourceFoundException(HttpMethod.PUT, "/" + mainFlightId, "The flight with id " + mainFlightId + " not found");
        } else {
            existingMainFlight.setDepartureCode(mainFlightData.getDepartureCode());
            existingMainFlight.setDepartureTime(mainFlightData.getDepartureTime());
            existingMainFlight.setArrivalCode(mainFlightData.getArrivalCode());
            existingMainFlight.setArrivalTime(mainFlightData.getArrivalTime());


            //ConnectingFlightsController will edit connecting flights
            mainFlightRepository.save(existingMainFlight);
        }
        return ResponseEntity.ok(existingMainFlight);//200

    }

    @DeleteMapping("/deleteMainFlight/{mainFlightId}")
    public ResponseEntity<?> deleteMainFlight(@PathVariable int mainFlightId) throws NoResourceFoundException {
        MainFlight mainFlight = mainFlightRepository.findById(mainFlightId).orElse(null);
        if (mainFlight == null) {
            throw new NoResourceFoundException(HttpMethod.DELETE, "/" + mainFlightId, "Flight with id " + mainFlightId + " not found");
        } else {
            mainFlightRepository.deleteById(mainFlightId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
