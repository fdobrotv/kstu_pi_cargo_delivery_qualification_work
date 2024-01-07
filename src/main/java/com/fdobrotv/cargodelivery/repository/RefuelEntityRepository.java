package com.fdobrotv.cargodelivery.repository;

import com.fdobrotv.cargodelivery.entity.RefuelEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface RefuelEntityRepository extends PagingAndSortingRepository<RefuelEntity, UUID>, CrudRepository<RefuelEntity, UUID> {
}