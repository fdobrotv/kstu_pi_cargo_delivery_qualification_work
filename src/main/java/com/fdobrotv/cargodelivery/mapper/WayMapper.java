package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.*;
import com.fdobrotv.cargodelivery.entity.RoadEntity;
import com.fdobrotv.cargodelivery.entity.SettlementEntity;
import com.fdobrotv.cargodelivery.entity.WayEntity;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class WayMapper {
    public static Way toDTO(WayEntity wayEntity) {
        Way way = new Way();
        way.id(wayEntity.getId());
        way.name(wayEntity.getName());
        way.description(wayEntity.getDescription());
        Settlement departureSettlement = SettlementMapper.toDTO(wayEntity.getDepartureSettlement());
        way.departureSettlement(departureSettlement);
        Settlement destinationSettlement = SettlementMapper.toDTO(wayEntity.getDestinationSettlement());
        way.destinationSettlement(destinationSettlement);
        way.roads(RoadMapper.toDTO(wayEntity.getRoads()));
        return way;
    }

    public static List<Way> toDTO(List<WayEntity> wayEntities) {
        return wayEntities.stream()
                .map(WayMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Way> toDTO(Iterable<WayEntity> wayEntities) {
        Stream<WayEntity> targetStream = StreamSupport.stream(wayEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static WayEntity toEntity(WayIn wayIn,
                                     SettlementEntity departureSettlementEntity,
                                     SettlementEntity arrivalSettlementEntity,
                                     List<RoadEntity> roadEntities) {
        WayEntity wayEntity = new WayEntity();
        wayEntity.setName(wayIn.getName());
        wayEntity.setDescription(wayIn.getDescription());
        wayEntity.setDepartureSettlement(departureSettlementEntity);
        wayEntity.setDestinationSettlement(arrivalSettlementEntity);
        wayEntity.setRoads(roadEntities);
        return wayEntity;
    }
}
