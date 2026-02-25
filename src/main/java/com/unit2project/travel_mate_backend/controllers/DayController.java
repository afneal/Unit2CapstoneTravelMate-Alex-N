package com.unit2project.travel_mate_backend.controllers;


import com.unit2project.travel_mate_backend.dto.DayDTO;
import com.unit2project.travel_mate_backend.models.Day;
import com.unit2project.travel_mate_backend.models.Trip;
import com.unit2project.travel_mate_backend.repositories.DayRepository;
import com.unit2project.travel_mate_backend.repositories.TripRepository;
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



    @DeleteMapping("/delete/{id}")
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
