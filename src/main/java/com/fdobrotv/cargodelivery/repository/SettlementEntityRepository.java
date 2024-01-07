package com.fdobrotv.cargodelivery.repository;

import com.fdobrotv.cargodelivery.entity.SettlementEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface SettlementEntityRepository extends PagingAndSortingRepository<SettlementEntity, UUID>, CrudRepository<SettlementEntity, UUID> {
}