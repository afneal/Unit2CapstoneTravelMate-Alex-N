package com.travel_mate_backend.repositories;

import com.travel_mate_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
     User findByUsername(String username);
}
