package com.fdobrotv.cargodelivery.repository;

import com.fdobrotv.cargodelivery.entity.WorkSlotEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface WorkSlotEntityRepository extends PagingAndSortingRepository<WorkSlotEntity, UUID>,
        CrudRepository<WorkSlotEntity, UUID> {
}