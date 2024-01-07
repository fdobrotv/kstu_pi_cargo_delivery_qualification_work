package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.*;
import com.fdobrotv.cargodelivery.entity.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class RefuelMapper {
    public static Refuel toDTO(RefuelEntity refuelEntity) {
        Refuel refuel = new Refuel();
        refuel.id(refuelEntity.getId());
        refuel.price(refuelEntity.getPrice().intValue());
        refuel.createdAt(refuelEntity.getCreatedAt());
        refuel.dateTime(refuelEntity.getDateTime());
        FuelStation departureSettlement = FuelStationMapper.toDTO(refuelEntity.getFuelStationEntity());
        refuel.fuelStation(departureSettlement);
        Car car = CarMapper.toDTO(refuelEntity.getCar());
        refuel.car(car);
        Driver driver = DriverMapper.toDTO(refuelEntity.getDriver());
        refuel.driver(driver);
        return refuel;
    }

    public static List<Refuel> toDTO(List<RefuelEntity> refuelEntities) {
        return refuelEntities.stream()
                .map(RefuelMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Refuel> toDTO(Iterable<RefuelEntity> refuelEntities) {
        Stream<RefuelEntity> targetStream = StreamSupport.stream(refuelEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static RefuelEntity toEntity(RefuelIn refuelIn,
                                        FuelStationEntity fuelStationEntity,
                                        CarEntity carEntity,
                                        DriverEntity driverEntity) {
        RefuelEntity refuelEntity = new RefuelEntity();
        refuelEntity.setPrice(refuelIn.getPrice().toBigInteger());
        refuelEntity.setCreatedAt(Instant.now().atOffset(ZoneOffset.UTC));
        refuelEntity.setDateTime(refuelIn.getDateTime());
        refuelEntity.setFuelStationEntity(fuelStationEntity);
        refuelEntity.setCar(carEntity);
        refuelEntity.setDriver(driverEntity);
        return refuelEntity;
    }
}
