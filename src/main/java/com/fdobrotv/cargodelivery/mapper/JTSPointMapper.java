//package com.fdobrotv.cargodelivery.mapper;
//
//import com.fdobrotv.cargodelivery.dto.Point;
//import com.vividsolutions.jts.geom.GeometryFactory;
//
//import java.math.BigDecimal;
//import java.util.List;
//import java.util.stream.Collectors;
//import java.util.stream.Stream;
//import java.util.stream.StreamSupport;
//
//public class JTSPointMapper {
//    public static Point toDTO(com.vividsolutions.jts.geom.Point geoPoint) {
//        return new Point().latitude(BigDecimal.valueOf(geoPoint.getX())).longitude(BigDecimal.valueOf(geoPoint.getY()));
//    }
//
//    public static List<Point> toDTO(List<com.vividsolutions.jts.geom.Point> points) {
//        return points.stream()
//                .map(JTSPointMapper::toDTO)
//                .collect(Collectors.toList());
//    }
//
//    public static List<Point> toDTO(Iterable<com.vividsolutions.jts.geom.Point> points) {
//        Stream<com.vividsolutions.jts.geom.Point> targetStream = StreamSupport.stream(points.spliterator(), false);
//        return toDTO(targetStream.toList());
//    }
//
//    public static com.vividsolutions.jts.geom.Point toEntity(Point point) {
//        new GeometryFactory();
//        return new com.vividsolutions.jts.geom.Point(point.getLatitude().doubleValue(), point.getLongitude().doubleValue());
//    }
//
//    public static List<com.vividsolutions.jts.geom.Point> toEntity(List<Point> points) {
//        return points.stream()
//                .map(JTSPointMapper::toEntity)
//                .collect(Collectors.toList());
//    }
//}
