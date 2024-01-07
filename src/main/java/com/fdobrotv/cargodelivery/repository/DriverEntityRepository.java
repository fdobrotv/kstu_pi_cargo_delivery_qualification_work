package com.fdobrotv.cargodelivery.repository;

import com.fdobrotv.cargodelivery.entity.DriverEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface DriverEntityRepository extends PagingAndSortingRepository<DriverEntity, UUID>,
        CrudRepository<DriverEntity, UUID> {
}