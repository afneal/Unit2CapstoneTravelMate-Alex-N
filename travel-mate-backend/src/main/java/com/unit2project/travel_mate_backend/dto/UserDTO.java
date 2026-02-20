package com.unit2project.travel_mate_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserDTO {  //DTO is data transfer object, used to transfer data btwn processes

    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 20, message = "Username must be 3-20 characters long.")
    private String username;

    @NotBlank(message = "Password is required.")
    @Size(min = 6, max = 15, message = "Password must be 6-15 characters long.")
    private String password;

    @NotBlank(message = "Email is required.")
    @Email(message = "Email should be valid.")
    private String email;

    public UserDTO(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
