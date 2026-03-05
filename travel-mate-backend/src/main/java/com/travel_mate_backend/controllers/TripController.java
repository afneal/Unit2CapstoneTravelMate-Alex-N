package com.travel_mate_backend.controllers;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.travel_mate_backend.dto.ActivityDTO;
import com.travel_mate_backend.dto.DayDTO;
import com.travel_mate_backend.dto.TripDTO;
import com.travel_mate_backend.models.Activity;
import com.travel_mate_backend.models.Day;
import com.travel_mate_backend.models.Trip;
import com.travel_mate_backend.models.User;
import com.travel_mate_backend.repositories.TripRepository;
import com.travel_mate_backend.repositories.UserRepository;
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
    public ResponseEntity<?> addNewTrip(@RequestBody TripDTO tripData) throws NoResourceFoundException {//Spring converts the incoming JSON data from the HTTP request body into a TripDTO object (called tripData). JSON has to match structure of TripDTO (name, userId, days)
        //Add this back in after user login created, and change Trip trip from
        //null param to user param
//        User user = userRepository.findByEmail(tripData.getUserEmail());//finds the user in the db using the email in the TripDTO (tripData.getUserEmail())
//        if (user == null) {
//            throw new NoResourceFoundException(HttpMethod.POST, "/addTrip", "User with email " + tripData.getUserEmail() + " not found"); // 400
//        }
        Trip trip = new Trip(tripData.getName(), null, new ArrayList<>());//creates new Trip entity with empty list of days with name of trip from TripDTO, User entity pulled from  TripDTO using email

        tripRepository.save(trip);
        return new ResponseEntity<>(trip, HttpStatus.CREATED);
    }

    @PutMapping("/editTripName/{id}")
    public ResponseEntity<?> updateTripNameById(@PathVariable int id, @RequestBody TripDTO tripData) throws NoResourceFoundException {
        Trip existingTrip = tripRepository.findById(id).orElse(null);
        if (existingTrip == null) {
            throw new NoResourceFoundException(HttpMethod.PUT, "/editTripName" + id, "The trip with id " + id + " not found");
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
            throw new NoResourceFoundException(HttpMethod.DELETE, "/delete" + id, "Trip with id " + id + " not found");
        } else {
            tripRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
