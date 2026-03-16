package com.travel_mate_backend.services;


import com.travel_mate_backend.dto.UserDTO;
import com.travel_mate_backend.models.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class UserServices {


    public String hashPassword(String password) {
        int logRounds = 10; //higher number means more secure but slower

        String salt = BCrypt.gensalt(logRounds); //salt is random sring added to the password before hashing, keeps hashes unique even if ppl use same passwords
                                                    //and prevents against attacks

        return BCrypt.hashpw(password, salt); //BCrypt combines password + salt and makes a hashed string
    }

    public boolean checkPassword(User user, String plainPassword) { //check if password entered at login matches the hashed password stored in database
        return BCrypt.checkpw(plainPassword, user.getPassword()); //BCrypt.checkpw hashes the input password and compares the hashes
    }

}
