package com.travel_mate_backend.repositories;

import com.travel_mate_backend.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripRepository extends JpaRepository <Trip, Integer> {
    List<Trip> findByUserUsername(String username);
}
