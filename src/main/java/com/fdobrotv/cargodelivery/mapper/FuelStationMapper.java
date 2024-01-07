package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.Point;
import com.fdobrotv.cargodelivery.dto.FuelStation;
import com.fdobrotv.cargodelivery.dto.FuelStationIn;
import com.fdobrotv.cargodelivery.entity.FuelStationEntity;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class FuelStationMapper {
    public static FuelStation toDTO(FuelStationEntity fuelStationEntity) {
        FuelStation fuelStation = new FuelStation();
        fuelStation.id(fuelStationEntity.getId());
        fuelStation.name(fuelStationEntity.getName());
        fuelStation.description(fuelStationEntity.getDescription());
        Point point = PointMapper.toDTO(fuelStationEntity.getCoordinates());
        fuelStation.coordinates(point);
        return fuelStation;
    }

    public static List<FuelStation> toDTO(List<FuelStationEntity> fuelStationEntities) {
        return fuelStationEntities.stream()
                .map(FuelStationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<FuelStation> toDTO(Iterable<FuelStationEntity> fuelStationEntities) {
        Stream<FuelStationEntity> targetStream = StreamSupport.stream(fuelStationEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static FuelStationEntity toEntity(FuelStationIn fuelStationIn) {
        FuelStationEntity fuelStationEntity = new FuelStationEntity();
        fuelStationEntity.setName(fuelStationIn.getName());
        fuelStationEntity.setDescription(fuelStationIn.getDescription());
        org.springframework.data.geo.Point point = PointMapper.toEntity(fuelStationIn.getCoordinates());
        fuelStationEntity.setCoordinates(point);
        return fuelStationEntity;
    }
}
