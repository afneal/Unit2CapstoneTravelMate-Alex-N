package com.travel_mate_backend.repositories;

import com.travel_mate_backend.dto.ItemDTO;
import com.travel_mate_backend.dto.ItemListDTO;
import com.travel_mate_backend.models.ItemList;
import com.travel_mate_backend.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemListRepository extends JpaRepository <ItemList, Integer> {
    List<ItemList> findByTripId(int tripId);
}
