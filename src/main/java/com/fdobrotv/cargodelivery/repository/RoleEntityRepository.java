package com.fdobrotv.cargodelivery.repository;

import com.fdobrotv.cargodelivery.entity.RoleEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.UUID;

public interface RoleEntityRepository extends PagingAndSortingRepository<RoleEntity, UUID>, CrudRepository<RoleEntity, UUID> {
}