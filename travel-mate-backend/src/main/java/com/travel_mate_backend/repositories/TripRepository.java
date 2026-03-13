package com.travel_mate_backend.repositories;

import com.travel_mate_backend.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository <Trip, Integer> {
    List<Trip> findByUserUsername(String username);
}
