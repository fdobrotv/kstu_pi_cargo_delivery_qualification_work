package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.Role;
import com.fdobrotv.cargodelivery.dto.RoleIn;
import com.fdobrotv.cargodelivery.entity.RoleEntity;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class RoleMapper {
    public static Role toDTO(RoleEntity roleEntity) {
        Role role = new Role();
        role.id(roleEntity.getId());
        role.name(roleEntity.getName());
        return role;
    }

    public static List<Role> toDTO(List<RoleEntity> roleEntities) {
        return roleEntities.stream()
                .map(RoleMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Role> toDTO(Iterable<RoleEntity> roleEntities) {
        Stream<RoleEntity> targetStream = StreamSupport.stream(roleEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static RoleEntity toEntity(RoleIn roleIn) {
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setName(roleIn.getName());
        return roleEntity;
    }
}
