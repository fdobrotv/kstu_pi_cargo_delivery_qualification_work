package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.*;
import com.fdobrotv.cargodelivery.entity.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class DriverMapper {
    public static Driver toDTO(DriverEntity driverEntity) {
        Driver driver = new Driver();
        driver.id(driverEntity.getId());
        Car car = CarMapper.toDTO(driverEntity.getCar());
        driver.car(car);
        User user = UserMapper.toDTO(driverEntity.getUser());
        driver.user(user);
        return driver;
    }

    public static List<Driver> toDTO(List<DriverEntity> driverEntities) {
        return driverEntities.stream()
                .map(DriverMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Driver> toDTO(Iterable<DriverEntity> driverEntities) {
        Stream<DriverEntity> targetStream = StreamSupport.stream(driverEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static DriverEntity toEntity(CarEntity carEntity, UserEntity userEntity) {
        DriverEntity driverEntity = new DriverEntity();
        driverEntity.setCar(carEntity);
        driverEntity.setUser(userEntity);
        return driverEntity;
    }
}
