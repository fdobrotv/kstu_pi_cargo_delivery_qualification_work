package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.Point;
import com.fdobrotv.cargodelivery.dto.Road;
import com.fdobrotv.cargodelivery.dto.Settlement;
import com.fdobrotv.cargodelivery.dto.SettlementIn;
import com.fdobrotv.cargodelivery.entity.RoadEntity;
import com.fdobrotv.cargodelivery.entity.SettlementEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class PointMapper {
    public static Point toDTO(org.springframework.data.geo.Point geoPoint) {
        return new Point().latitude(BigDecimal.valueOf(geoPoint.getX())).longitude(BigDecimal.valueOf(geoPoint.getY()));
    }

    public static List<Point> toDTO(List<org.springframework.data.geo.Point> points) {
        return points.stream()
//                .limit(10)
                .map(PointMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Point> toDTO(Iterable<org.springframework.data.geo.Point> points) {
        Stream<org.springframework.data.geo.Point> targetStream = StreamSupport.stream(points.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static org.springframework.data.geo.Point toEntity(Point point) {
        return new org.springframework.data.geo.Point(point.getLatitude().doubleValue(), point.getLongitude().doubleValue());
    }

    public static List<org.springframework.data.geo.Point> toEntity(List<Point> points) {
        return points.stream()
                .map(PointMapper::toEntity)
                .collect(Collectors.toList());
    }
}
