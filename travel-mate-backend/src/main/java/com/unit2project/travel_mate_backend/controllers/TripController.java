package com.unit2project.travel_mate_backend.controllers;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.unit2project.travel_mate_backend.dto.ActivityDTO;
import com.unit2project.travel_mate_backend.dto.DayDTO;
import com.unit2project.travel_mate_backend.dto.TripDTO;
import com.unit2project.travel_mate_backend.models.Activity;
import com.unit2project.travel_mate_backend.models.Day;
import com.unit2project.travel_mate_backend.models.Trip;
import com.unit2project.travel_mate_backend.models.User;
import com.unit2project.travel_mate_backend.repositories.TripRepository;
import com.unit2project.travel_mate_backend.repositories.UserRepository;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    TripRepository tripRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("")
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTripById(@PathVariable int id) throws NoResourceFoundException {
        Trip trip = tripRepository.findById(id).orElse(null);
        if (trip == null) {
            throw new NoResourceFoundException(HttpMethod.GET, "/" + id, "Trip with id " + id + " not found");
        } else {
            return new ResponseEntity<>(trip, HttpStatus.OK);
        }
    }


    @PostMapping("/addTrip")//add only trip name, add days/activities through other endpoints
    public ResponseEntity<?> addNewTrip(@RequestBody TripDTO tripData) {//Spring converts the incoming JSON data from the HTTP request body into a TripDTO object (called tripData). JSON has to match structure of TripDTO (name, userId, days)
        User user = userRepository.findByEmail(tripData.getUserEmail());//finds the user in the db using the email in the TripDTO (tripData.getUserEmail())
        if (user == null) {
            return new ResponseEntity<>("User with email " + tripData.getUserEmail() + " not found", HttpStatus.BAD_REQUEST); // 400
        }

        Trip trip = new Trip(tripData.getName(), user, new ArrayList<>());//creates new Trip entity with empty list of days with name of trip from TripDTO, User entity pulled from  TripDTO using email

        tripRepository.save(trip);
        return new ResponseEntity<>(trip, HttpStatus.CREATED);
    }

    @PutMapping("/editTripName/{id}")
    public ResponseEntity<?> updateTripNameById(@PathVariable int id, @RequestBody TripDTO tripData) throws NoResourceFoundException {
        Trip existingTrip = tripRepository.findById(id).orElse(null);
        if (existingTrip == null) {
            throw new NoResourceFoundException(HttpMethod.PUT, "/" + id, "The trip with id " + id + " not found");
        } else {
            existingTrip.setName(tripData.getName());
        }
        tripRepository.save(existingTrip);
        return ResponseEntity.ok(existingTrip);
    }

    @DeleteMapping("/delete/{id}") //add "are you sure" button to front end
    public ResponseEntity<?> deleteTrip(@PathVariable int id) throws NoResourceFoundException {
        Trip trip = tripRepository.findById(id).orElse(null);
        if (trip == null) {
            throw new NoResourceFoundException(HttpMethod.DELETE, "/" + id, "Trip with id " + id + " not found");
        } else {
            tripRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
