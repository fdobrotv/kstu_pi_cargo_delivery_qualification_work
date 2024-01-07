package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.*;
import com.fdobrotv.cargodelivery.entity.CarEntity;
import com.fdobrotv.cargodelivery.entity.DriverEntity;
import com.fdobrotv.cargodelivery.entity.IncidentEntity;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class IncidentMapper {
    public static Incident toDTO(IncidentEntity incidentEntity) {
        Incident incident = new Incident();
        incident.id(incidentEntity.getId());
        incident.description(incidentEntity.getDescription());
        incident.createdAt(incidentEntity.getCreatedAt());
        incident.dateTime(incidentEntity.getDateTime());
        Car car = CarMapper.toDTO(incidentEntity.getCar());
        incident.car(car);
        Driver driver = DriverMapper.toDTO(incidentEntity.getDriver());
        incident.driver(driver);
        Point point = PointMapper.toDTO(incidentEntity.getCoordinates());
        incident.coordinates(point);
        return incident;
    }

    public static List<Incident> toDTO(List<IncidentEntity> incidentEntities) {
        return incidentEntities.stream()
                .map(IncidentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Incident> toDTO(Iterable<IncidentEntity> incidentEntities) {
        Stream<IncidentEntity> targetStream = StreamSupport.stream(incidentEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static IncidentEntity toEntity(IncidentIn incidentIn,
                                        CarEntity carEntity,
                                        DriverEntity driverEntity) {
        IncidentEntity incidentEntity = new IncidentEntity();
        incidentEntity.setDescription(incidentIn.getDescription());
        incidentEntity.setCreatedAt(Instant.now().atOffset(ZoneOffset.UTC));
        incidentEntity.setDateTime(incidentIn.getDateTime());
        incidentEntity.setCar(carEntity);
        incidentEntity.setDriver(driverEntity);
        org.springframework.data.geo.Point point = PointMapper.toEntity(incidentIn.getCoordinates());
        incidentEntity.setCoordinates(point);
        return incidentEntity;
    }
}
