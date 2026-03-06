package com.travel_mate_backend.services;


import com.travel_mate_backend.dto.UserDTO;
import com.travel_mate_backend.models.User;
import org.mindrot.jbcrypt.BCrypt;

public class UserServices {


    public String hashPassword(String password) {
        int logRounds = 10; //higher number means more secure but slower

        String salt = BCrypt.gensalt(logRounds);

        return BCrypt.hashpw(password, salt);
    }

    public boolean checkPassword(User user, String plainPassword) {
        return BCrypt.checkpw(plainPassword, user.getPassword());
    }

}
