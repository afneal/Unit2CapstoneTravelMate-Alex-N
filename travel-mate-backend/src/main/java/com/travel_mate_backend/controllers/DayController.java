package com.travel_mate_backend.controllers;


import com.travel_mate_backend.dto.ActivityDTO;
import com.travel_mate_backend.dto.DayDTO;
import com.travel_mate_backend.models.Activity;
import com.travel_mate_backend.models.Day;
import com.travel_mate_backend.models.Trip;
import com.travel_mate_backend.repositories.DayRepository;
import com.travel_mate_backend.repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/days")
public class DayController {

    @Autowired
    DayRepository dayRepository;

    @Autowired
    TripRepository tripRepository;



    @PostMapping("/addDay/{tripId}") //pathvariable: id of day trip to add to(from url) requestbody: converts JSON to dayDTO called dayData
    public ResponseEntity<?> addNewDay(@PathVariable int tripId, @RequestBody DayDTO dayData) throws NoResourceFoundException {
        Trip trip = tripRepository.findById(tripId).orElse(null); //search by trip id in trip repo
        if (trip == null) {
            throw new NoResourceFoundException(HttpMethod.POST, "/" + tripId, "Trip with id " + tripId + " not found");
        }

        //create new day entity with dayData payload)
        Day day = new Day(dayData.getCity(), dayData.getDate(), new ArrayList<>());
        day.setTrip(trip); //add new day to trip
        dayRepository.save(day);
        return new ResponseEntity<>(day, HttpStatus.CREATED);
    }

    @PutMapping("/editDay/{dayId}") //edit day and associated activities
    public ResponseEntity<?> updateDayById(@PathVariable int dayId, @RequestBody DayDTO dayData) throws NoResourceFoundException {
        Day existingDay = dayRepository.findById(dayId).orElse(null); //find existing day by dayid
        if (existingDay == null) {
            throw new NoResourceFoundException(HttpMethod.PUT, "/" + dayId, "The day with id " + dayId + " not found");
        } else {
            //update day with DTO payload
            existingDay.setCity(dayData.getCity());
            existingDay.setDate(dayData.getDate());

            //ActivityController will edit activities

            dayRepository.save(existingDay); //save the update to day repo

        }return ResponseEntity.ok(existingDay);//200

    }


    @DeleteMapping("/deleteDay/{id}") //pathvariable: id of the day to be deleted (from url)
    public ResponseEntity<?> deleteDay(@PathVariable int id) throws NoResourceFoundException {
        Day day = dayRepository.findById(id).orElse(null); //find the day by id
        if (day == null) {
            throw new NoResourceFoundException(HttpMethod.DELETE, "/" + id, "Day with id " + id + " not found");
        } else {
            dayRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
