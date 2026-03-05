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

    @GetMapping("")
    public List<Day> getAllDays() {
        return dayRepository.findAll();
    }

    @GetMapping("/{dayId}")
    public ResponseEntity<?> getDayById(@PathVariable int dayId) throws NoResourceFoundException {
        Day day = dayRepository.findById(dayId).orElse(null);
        if (day == null) {
            throw new NoResourceFoundException(HttpMethod.GET, "/" + dayId, "Day with id " + dayId + " not found");//404
        } else {
            return new ResponseEntity<>(day, HttpStatus.OK); //200
        }
    }


    @PostMapping("/addDay/{tripId}")
    public ResponseEntity<?> addNewDay(@PathVariable int tripId, @RequestBody DayDTO dayData) throws NoResourceFoundException {
        Trip trip = tripRepository.findById(tripId).orElse(null);
        if (trip == null) {
            throw new NoResourceFoundException(HttpMethod.POST, "/" + tripId, "Trip with id " + tripId + " not found");
        }

        Day day = new Day(dayData.getCity(), dayData.getDate(), new ArrayList<>());
        day.setTrip(trip);
        dayRepository.save(day);
        return new ResponseEntity<>(day, HttpStatus.CREATED);
    }

    @PutMapping("/editDay/{dayId}") //edit day and associated activities
    public ResponseEntity<?> updateDayById(@PathVariable int dayId, @RequestBody DayDTO dayData) throws NoResourceFoundException {
        Day existingDay = dayRepository.findById(dayId).orElse(null);
        if (existingDay == null) {
            throw new NoResourceFoundException(HttpMethod.PUT, "/" + dayId, "The day with id " + dayId + " not found");
        } else {
            existingDay.setCity(dayData.getCity());
            existingDay.setDate(dayData.getDate());

            //ActivityController will edit activities

            dayRepository.save(existingDay);

        }return ResponseEntity.ok(existingDay);//200

    }


    @DeleteMapping("/deleteDay/{id}")
    public ResponseEntity<?> deleteDay(@PathVariable int id) throws NoResourceFoundException {
        Day day = dayRepository.findById(id).orElse(null);
        if (day == null) {
            throw new NoResourceFoundException(HttpMethod.DELETE, "/" + id, "Day with id " + " not found");
        } else {
            dayRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
