package com.unit2project.travel_mate_backend.repositories;

import com.unit2project.travel_mate_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
     User findByEmail(String email);
}
