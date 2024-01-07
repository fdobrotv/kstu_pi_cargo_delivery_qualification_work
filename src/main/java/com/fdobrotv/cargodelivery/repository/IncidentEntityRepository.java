package com.fdobrotv.cargodelivery.repository;

import com.fdobrotv.cargodelivery.entity.IncidentEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface IncidentEntityRepository extends PagingAndSortingRepository<IncidentEntity, UUID>,
        CrudRepository<IncidentEntity, UUID> {
}