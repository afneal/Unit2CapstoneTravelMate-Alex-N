package com.travel_mate_backend.repositories;

import com.travel_mate_backend.models.ConnectingFlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConnectingFlightRepository extends JpaRepository<ConnectingFlight, Integer> {
}
