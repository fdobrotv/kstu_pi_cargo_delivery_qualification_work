package com.fdobrotv.cargodelivery.repository;

import com.fdobrotv.cargodelivery.entity.WayEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface WayEntityRepository extends PagingAndSortingRepository<WayEntity, UUID>, CrudRepository<WayEntity, UUID> {
}