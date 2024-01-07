package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.*;
import com.fdobrotv.cargodelivery.entity.CarEntity;
import com.fdobrotv.cargodelivery.entity.DriverEntity;
import com.fdobrotv.cargodelivery.entity.WorkSlotEntity;
import lombok.extern.java.Log;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Log
public class WorkSlotMapper {
    public static WorkSlot toDTO(WorkSlotEntity workSlotEntity) {
        WorkSlot workSlot = new WorkSlot();
        UUID id = workSlotEntity.getId();
        workSlot.id(id);
        OffsetDateTime startedAt = workSlotEntity.getStartedAt();
        workSlot.startedAt(startedAt);
        OffsetDateTime finishedAt = workSlotEntity.getFinishedAt();
        workSlot.finishedAt(finishedAt);
        Car car = CarMapper.toDTO(workSlotEntity.getCarEntity());
        workSlot.car(car);
        Driver driver = DriverMapper.toDTO(workSlotEntity.getDriverEntity());
        workSlot.driver(driver);
        Point startCoordinates = PointMapper.toDTO(workSlotEntity.getStartCoordinates());
        workSlot.startCoordinates(startCoordinates);
        Point endCoordinates = PointMapper.toDTO(workSlotEntity.getEndCoordinates());
        workSlot.endCoordinates(endCoordinates);
        return workSlot;
    }

    public static List<WorkSlot> toDTO(List<WorkSlotEntity> workSlotEntities) {
        return workSlotEntities.stream()
                .map(WorkSlotMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<WorkSlot> toDTO(Iterable<WorkSlotEntity> workSlotEntities) {
        Stream<WorkSlotEntity> targetStream = StreamSupport.stream(workSlotEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static WorkSlotEntity toEntity(WorkSlotIn workSlotIn, CarEntity carEntity, DriverEntity driverEntity) {
        WorkSlotEntity workSlotEntity = new WorkSlotEntity();
        workSlotEntity.setStartedAt(workSlotIn.getStartedAt());
        workSlotEntity.setFinishedAt(workSlotIn.getFinishedAt());
        workSlotEntity.setCarEntity(carEntity);
        workSlotEntity.setDriverEntity(driverEntity);
        org.springframework.data.geo.Point startPoint = PointMapper.toEntity(workSlotIn.getStartCoordinates());
        workSlotEntity.setStartCoordinates(startPoint);
        org.springframework.data.geo.Point endPoint = PointMapper.toEntity(workSlotIn.getEndCoordinates());
        workSlotEntity.setEndCoordinates(endPoint);
        return workSlotEntity;
    }
}
