package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.Point;
import com.fdobrotv.cargodelivery.dto.Settlement;
import com.fdobrotv.cargodelivery.dto.SettlementIn;
import com.fdobrotv.cargodelivery.entity.CarEntity;
import com.fdobrotv.cargodelivery.entity.SettlementEntity;

import java.math.BigDecimal;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class SettlementMapper {
    public static Settlement toDTO(SettlementEntity settlementEntity) {
        Settlement settlement = new Settlement();
        settlement.id(settlementEntity.getId());
        settlement.name(settlementEntity.getName());
        Point point = PointMapper.toDTO(settlementEntity.getCoordinates());
//        Point point = JTSPointMapper.toDTO(settlementEntity.getCoordinates());
        settlement.coordinates(point);
        return settlement;
    }

    public static List<Settlement> toDTO(List<SettlementEntity> settlementEntities) {
        return settlementEntities.stream()
                .map(SettlementMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Settlement> toDTO(Iterable<SettlementEntity> settlementEntities) {
        Stream<SettlementEntity> targetStream = StreamSupport.stream(settlementEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static SettlementEntity toEntity(SettlementIn settlementIn) {
        SettlementEntity settlementEntity = new SettlementEntity();
        settlementEntity.setName(settlementIn.getName());
        org.springframework.data.geo.Point point = PointMapper.toEntity(settlementIn.getCoordinates());
        settlementEntity.setCoordinates(point);
        return settlementEntity;
    }
}
