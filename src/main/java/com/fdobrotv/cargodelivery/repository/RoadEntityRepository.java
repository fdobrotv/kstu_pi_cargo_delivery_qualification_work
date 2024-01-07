package com.fdobrotv.cargodelivery.repository;

import com.fdobrotv.cargodelivery.entity.RoadEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface RoadEntityRepository extends PagingAndSortingRepository<RoadEntity, UUID>, CrudRepository<RoadEntity, UUID> {
}