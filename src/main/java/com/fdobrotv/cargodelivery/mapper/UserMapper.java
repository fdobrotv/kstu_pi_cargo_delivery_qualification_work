package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.*;
import com.fdobrotv.cargodelivery.entity.*;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class UserMapper {
    public static User toDTO(UserEntity userEntity) {
        User user = new User();
        user.id(userEntity.getId());
        user.firstName(userEntity.getFirstName());
        user.lastName(userEntity.getLastName());
        user.middleName(userEntity.getMiddleName());
        user.role(userEntity.getRole().getName());
        OffsetDateTime createdAt = userEntity.getCreatedAt();
        user.createdAt(createdAt);
        user.phone(userEntity.getPhone().toString());
        user.email(userEntity.getEmail());
        return user;
    }

    public static List<User> toDTO(List<UserEntity> userEntities) {
        return userEntities.stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<User> toDTO(Iterable<UserEntity> userEntities) {
        Stream<UserEntity> targetStream = StreamSupport.stream(userEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static UserEntity toEntity(UserIn userIn, RoleEntity roleEntity) {
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(userIn.getFirstName());
        userEntity.setLastName(userIn.getLastName());
        userEntity.setMiddleName(userIn.getMiddleName());
        userEntity.setRole(roleEntity);
        userEntity.setCreatedAt(Instant.now().atOffset(ZoneOffset.UTC));
        userEntity.setPhone(Integer.valueOf(userIn.getPhone()));
        userEntity.setEmail(userIn.getEmail());
        return userEntity;
    }
}
