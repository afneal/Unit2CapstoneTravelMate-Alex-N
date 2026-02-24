package com.unit2project.travel_mate_backend.repositories;

import com.unit2project.travel_mate_backend.models.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer> {

}
