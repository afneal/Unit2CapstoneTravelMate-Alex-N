package com.travel_mate_backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class User { //stored in database as an object

    @Id  //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //lets Hibernate autogenerate id
    private int id;

    private String username;

    private String password;

    @JsonManagedReference
    @OneToMany(mappedBy = "user")
    private List<Trip> trips;

    public User() { //default constructor needed by Hibernate to instantiate objects when retrieving from the database
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
