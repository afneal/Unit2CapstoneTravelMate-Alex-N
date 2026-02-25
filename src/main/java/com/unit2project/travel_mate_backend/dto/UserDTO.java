package com.unit2project.travel_mate_backend.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserDTO {  //DTO is data transfer object, used to transfer data btwn processes
                        //an API object, what gets sent/received in HTTP requests
                        //use DTO data structure for postman testing
    private int id;

    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 20, message = "First name must be 3-20 characters long.")
    private String firstName;

    @NotBlank(message = "Email is required.")
    @Email(message = "Email should be valid.")
    private String email;

    @NotBlank(message = "Password is required.")
    @Size(min = 6, max = 15, message = "Password must be 6-15 characters long.")
    private String password;


    public UserDTO(String firstName, String email,String password) {
        this.firstName = firstName;
        this.email = email;
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
