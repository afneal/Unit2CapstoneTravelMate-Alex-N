package com.unit2project.travel_mate_backend.controllers;


import com.unit2project.travel_mate_backend.models.Day;
import com.unit2project.travel_mate_backend.repositories.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/days")
public class DayController {

    @Autowired
    DayRepository dayRepository;

    @GetMapping("")
    public List<Day> getAllDays() {
        return dayRepository.findAll();
    }

    @PostMapping("/addDay")
    public ResponseEntity<?> addNewDay(@RequestBody DayDTO dayData) {
        Day day = new Day(dayData.getDate(), dayData.getNotes(), dayData.getTrip());
        dayRepository.save(day);
        return new ResponseEntity<>(day, HttpStatus.CREATED);
    }


}
