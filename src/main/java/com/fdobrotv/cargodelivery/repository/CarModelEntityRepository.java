package com.fdobrotv.cargodelivery.repository;

import com.fdobrotv.cargodelivery.entity.CarModelEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface CarModelEntityRepository extends PagingAndSortingRepository<CarModelEntity, UUID>, CrudRepository<CarModelEntity, UUID> {
}