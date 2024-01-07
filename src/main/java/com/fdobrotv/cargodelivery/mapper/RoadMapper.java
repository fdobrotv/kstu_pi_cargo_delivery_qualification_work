package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.Point;
import com.fdobrotv.cargodelivery.dto.Road;
import com.fdobrotv.cargodelivery.dto.RoadIn;
import com.fdobrotv.cargodelivery.entity.RoadEntity;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class RoadMapper {
    public static Road toDTO(RoadEntity roadEntity) {
        Road road = new Road();
        road.id(roadEntity.getId());
        road.name(roadEntity.getName());
        road.description(roadEntity.getDescription());
        List<org.springframework.data.geo.Point> path = roadEntity.getPath();
        List<Point> point = PointMapper.toDTO(path);
        road.path(point);
        return road;
    }

    public static List<Road> toDTO(List<RoadEntity> roadEntities) {
        return roadEntities.stream()
                .map(RoadMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Road> toDTO(Iterable<RoadEntity> roadEntities) {
        Stream<RoadEntity> targetStream = StreamSupport.stream(roadEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static RoadEntity toEntity(RoadIn roadIn) {
        RoadEntity roadEntity = new RoadEntity();
        roadEntity.setName(roadIn.getName());
        roadEntity.setDescription(roadIn.getDescription());
        List<org.springframework.data.geo.Point> path = PointMapper.toEntity(roadIn.getPath());
        roadEntity.setPath(path);
        return roadEntity;
    }
}
