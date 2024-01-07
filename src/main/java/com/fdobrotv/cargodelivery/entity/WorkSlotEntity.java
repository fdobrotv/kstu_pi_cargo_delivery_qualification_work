package com.fdobrotv.cargodelivery.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.geo.Point;

import java.time.OffsetDateTime;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "work_slot")
public class WorkSlotEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    @Setter(AccessLevel.NONE)
    private UUID id;

    @Column(name = "started_at", nullable = false)
    @JdbcTypeCode(SqlTypes.TIMESTAMP_WITH_TIMEZONE)
    private OffsetDateTime startedAt;

    @Column(name = "finished_at", nullable = false)
    @JdbcTypeCode(SqlTypes.TIMESTAMP_WITH_TIMEZONE)
    private OffsetDateTime finishedAt;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private CarEntity carEntity;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private DriverEntity driverEntity;

    @Column(name = "start_coordinates", nullable = false, columnDefinition = "geometry(Point,4326)")
    private Point startCoordinates;

    @Column(name = "end_coordinates", nullable = false, columnDefinition = "geometry(Point,4326)")
    private Point endCoordinates;

}