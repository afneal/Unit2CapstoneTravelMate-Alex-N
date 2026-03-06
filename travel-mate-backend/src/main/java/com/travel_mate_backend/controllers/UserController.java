package com.travel_mate_backend.controllers;


import com.travel_mate_backend.dto.UserDTO;
import com.travel_mate_backend.models.User;
import com.travel_mate_backend.repositories.UserRepository;
import com.travel_mate_backend.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired // dependency injection to access the UserRepository
    UserRepository userRepository; // allows to perform CRUD operations on the User entity in the database
    UserServices userServices;

    @PostMapping("/register")
    public ResponseEntity<?> addNewUser(@RequestBody UserDTO userData) {
        if (userRepository.findByUsername(userData.getUsername()) != null) {
            return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);//409
        }

        UserServices userServices = new UserServices();
        //Create new user with hashedPass
        User user = new User(userData.getUsername(), userServices.hashPassword(userData.getPassword()));
        userRepository.save(user);

        return new ResponseEntity<>(user, HttpStatus.CREATED);// 201 response indicating that a new resource has been created successfully

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO userData) { //RequestBody to convert the JSON data(from the HTTP text input) into a UserDTO object(userData)
        User user = userRepository.findByUsername(userData.getUsername()); //creates a new User object by searching the database for a user with the userName provided in the login request(userData).
        // If a user with that username exists, it will be stored in the user variable; otherwise, user will be null.
        UserServices userServices = new UserServices();
        if (user != null && userServices.checkPassword(user, userData.getPassword())) {
            return new ResponseEntity<>(user, HttpStatus.OK); // 200 response indicating successful login and returning user object in the response body
        } else {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED); // 401 response indicating unauthorized access
        }
    }

}
