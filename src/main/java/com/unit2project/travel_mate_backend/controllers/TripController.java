package com.unit2project.travel_mate_backend.controllers;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.unit2project.travel_mate_backend.dto.DayDTO;
import com.unit2project.travel_mate_backend.dto.TripDTO;
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

//@Id
//@GeneratedValue(strategy = GenerationType.IDENTITY)
//private int id;
//
//private String name;
//
//@JsonManagedReference
//private User user; //stores the user who created this trip, many trips can belong to one user, but a trip can only belong to one user
//
//@OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true) //one trip can have many days, mappedBy points to the field in Day that owns the relationship, cascade ALL means all operations on Trip will cascade to its days, orphanRemoval means if a day is removed from the trip's list, it will be deleted from the database
//private List<Day> days; //stores the list of days for this trip
//
//public Trip() {//default constructor needed by Hibernate to instantiate objects when retrieving from the database
//}
//
//public Trip(String name, User user, List<Day> days) {
//    this.name = name;
//    this.user = user;
//    this.days = days;
//}
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


    @PostMapping("/addTrip")
    public ResponseEntity<?> addNewTrip(@RequestBody TripDTO tripData) {
        User user = userRepository.findById(tripData.getUserId()).orElse(null);
        List<Day> days = new ArrayList<>();
        for (DayDTO day : tripData.getDays()) {
            Day newDay = new Day(day.getCity(), day.getDate(), day.getActivities());
            days.add(newDay);
        }

        Trip trip = new Trip(tripData.getName(), user, days);
        tripRepository.save(trip);
        return new ResponseEntity<>(trip, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
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
