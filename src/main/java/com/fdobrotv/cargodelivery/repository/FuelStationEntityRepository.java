package com.fdobrotv.cargodelivery.repository;

import com.fdobrotv.cargodelivery.entity.FuelStationEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface FuelStationEntityRepository extends PagingAndSortingRepository<FuelStationEntity, UUID>,
        CrudRepository<FuelStationEntity, UUID> {
}