package com.unit2project.travel_mate_backend.repositories;

import com.unit2project.travel_mate_backend.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository <Trip, Integer> {

}
