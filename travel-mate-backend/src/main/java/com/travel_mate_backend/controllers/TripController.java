package com.travel_mate_backend.controllers;


import com.travel_mate_backend.dto.ItemListDTO;
import com.travel_mate_backend.dto.TripDTO;
import com.travel_mate_backend.models.ItemList;
import com.travel_mate_backend.models.Trip;
import com.travel_mate_backend.models.User;
import com.travel_mate_backend.repositories.ItemListRepository;
import com.travel_mate_backend.repositories.TripRepository;
import com.travel_mate_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/trips")
public class TripController {

    //autowired to inject the repositories to reach database
    @Autowired
    TripRepository tripRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ItemListRepository itemListRepository;

    @GetMapping("")
    public List<Trip> getTripsByUsername(@RequestParam String username) { //requestparam: take the username query from the url
        return tripRepository.findByUserUsername(username); //custom query from tripRepository to find all trips for the user
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTripById(@PathVariable int id) throws NoResourceFoundException { //pathvariable: maps {id} from url to parameter: id
        Trip trip = tripRepository.findById(id).orElse(null); //find trip by trip id
        if (trip == null) { //triggers the global exception handler
            throw new NoResourceFoundException(HttpMethod.GET, "/" + id, "Trip with id " + id + " not found");
        }

            //get all lists for the specific trip id
            List<ItemList> lists = itemListRepository.findByTripId(id);
            trip.setLists(lists);

            return new ResponseEntity<>(trip, HttpStatus.OK);
        }



    @PostMapping("/addTrip")//add only trip name, add days/activities through other endpoints
    public ResponseEntity<?> addNewTrip(@RequestBody TripDTO tripData) throws NoResourceFoundException {//Spring converts the incoming JSON data from the HTTP request body into a TripDTO object (called tripData). JSON has to match structure of TripDTO (name, username, days)


        User user = userRepository.findByUsername(tripData.getUsername());//finds the user in the db using the username in the TripDTO (tripData.getUsername())
        if (user == null) {
            throw new NoResourceFoundException(HttpMethod.POST, "/addTrip", "Username " + tripData.getUsername() + " not found"); // 400
        }
        //creates new trip object with trip name from tripDTO(tripData), user entity, empty days list
        Trip trip = new Trip(tripData.getName(), user, new ArrayList<>());

        //create default lists to add to each new trip
        ItemList packingList = new ItemList("Packing", false, trip);
        ItemList remindersList = new ItemList("Reminders", false, trip);

        List<ItemList> lists = new ArrayList<>(); //reate new empty ArrayList to hold the ItemList objects, avoids null
        lists.add(packingList);  //add the previously created lists to the emtpy array list (the default lists for each trip)
        lists.add(remindersList);

        //dont have to save to ItemListRepository b/c Trip has Cascasde all which will auto save all

        trip.setLists(lists); //saves the array list to the trip so the trip object has empty lists to work with

        tripRepository.save(trip);

        return new ResponseEntity<>(trip, HttpStatus.CREATED);
    }

    @PutMapping("/editTripName/{id}")
    public ResponseEntity<?> updateTripNameById(@PathVariable int id, @RequestBody TripDTO tripData) throws NoResourceFoundException {
        Trip existingTrip = tripRepository.findById(id).orElse(null); //find trip by tripId
        if (existingTrip == null) {
            throw new NoResourceFoundException(HttpMethod.PUT, "/editTripName" + id, "The trip with id " + id + " not found");
        } else {
            existingTrip.setName(tripData.getName()); //updates trip name to name from tripData (TripDTO payload)
        }
        tripRepository.save(existingTrip);
        return ResponseEntity.ok(existingTrip);
    }

    @DeleteMapping("/delete/{id}") //add "are you sure" button to front end
    public ResponseEntity<?> deleteTrip(@PathVariable int id) throws NoResourceFoundException {
        Trip trip = tripRepository.findById(id).orElse(null); //find trip by tripid
        if (trip == null) {
            throw new NoResourceFoundException(HttpMethod.DELETE, "/delete" + id, "Trip with id " + id + " not found");
        } else {
            tripRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
