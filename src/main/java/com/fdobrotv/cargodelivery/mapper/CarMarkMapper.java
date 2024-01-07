package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.CarMark;
import com.fdobrotv.cargodelivery.dto.CarMarkIn;
import com.fdobrotv.cargodelivery.entity.CarMarkEntity;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class CarMarkMapper {
    public static CarMark toDTO(CarMarkEntity carMarkEntity) {
        CarMark carMark = new CarMark();
        carMark.id(carMarkEntity.getId());
        carMark.name(carMarkEntity.getName());
        return carMark;
    }

    public static List<CarMark> toDTO(List<CarMarkEntity> carMarkEntities) {
        return carMarkEntities.stream()
                .map(CarMarkMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<CarMark> toDTO(Iterable<CarMarkEntity> carMarkEntities) {
        Stream<CarMarkEntity> targetStream = StreamSupport.stream(carMarkEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static CarMarkEntity toEntity(CarMarkIn carMarkIn) {
        CarMarkEntity carMarkEntity = new CarMarkEntity();
        carMarkEntity.setName(carMarkIn.getName());
        return carMarkEntity;
    }
}
