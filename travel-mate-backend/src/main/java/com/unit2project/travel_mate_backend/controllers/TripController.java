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


    @PostMapping("/addTrip")//add complete trip object
    public ResponseEntity<?> addNewTrip(@RequestBody TripDTO tripData) {//Spring converts the incoming JSON data from the HTTP request body into a TripDTO object (called tripData). JSON has to match structure of TripDTO (name, userId, days)
        User user = userRepository.findByEmail(tripData.getUserEmail());//finds the user in the db using the email in the TripDTO (tripData.getUserEmail())
        if (user == null) {
            return new ResponseEntity<>("User with email " + tripData.getUserEmail() + " not found", HttpStatus.BAD_REQUEST); // 400
        }

        List<Day> days = new ArrayList<>();// creates an empty ArrayList to store the Day entities associated with the Trip.
        Trip trip = new Trip(tripData.getName(), user, days);//creates new Trip entity with empty list of days with name of trip from TripDTO, User entity pulled from  TripDTO using email

        for (DayDTO dayDTO : tripData.getDays()) {// iterates over the List<DayDTO> (from TripDTO, getDays() getter)
            //and assigns each DayDTO(city, date, List<Activity>) to variable day
            Day newDay = new Day(dayDTO.getCity(), dayDTO.getDate(), new ArrayList<>());//creates new Day entity from the data in the DayDTO (city, date, activities)
            newDay.setTrip(trip);//sets association btwn trip and day so day with have the trip fk

            //use map to change ActivityDTO to Activity
            if (dayDTO.getActivities() != null) {
                for (ActivityDTO activityDTO : dayDTO.getActivities()) {//loop over ActivityDTO and create Activity entities
                    Activity newActivity = new Activity(activityDTO.getName(), activityDTO.getTime(), activityDTO.getNotes());
                    newActivity.setDay(newDay);//sets association btwn day and activity so activity will have the day fk
                    newDay.getActivities().add(newActivity);//add the new Activity to the day
                }
            }

            days.add(newDay);//adds the new Day object to the empty array list of days
        }

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
