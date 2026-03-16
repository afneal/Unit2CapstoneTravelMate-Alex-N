package com.travel_mate_backend.dto;

//import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserDTO {  //DTO is data transfer object, used to transfer only needed data btwn processes
                        //an API object, what gets sent/received in HTTP requests
                        //use DTO data structure for postman testing
    private int id;

    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 20, message = "Username must be 3-20 characters long.")
    private String username;


    @NotBlank(message = "Password is required.")
    @Size(min = 6, max = 15, message = "Password must be 6-15 characters long.")
    private String password;


    public UserDTO(String username, String password) {
        this.username = username;
        this.password = password;
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

}
