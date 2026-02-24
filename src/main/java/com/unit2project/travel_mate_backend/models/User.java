package com.unit2project.travel_mate_backend.models;

import jakarta.persistence.*;

@Entity
public class User {

    @Id  //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //lets Hibernate autogenerate id
    private int id;

    private String firstName;
    private String email;
    private String password;

//    @OneToMany(mappedBy = "user")

    public User() { //default constructor needed by Hibernate to instantiate objects when retrieving from the database
    }

    public User(String firstName, String email, String password) {
        this.firstName = firstName;
        this.email = email;
        this.password = password;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
