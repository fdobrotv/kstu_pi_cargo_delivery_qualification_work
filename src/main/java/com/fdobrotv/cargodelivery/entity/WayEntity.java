package com.fdobrotv.cargodelivery.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "way")
public class WayEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    @Setter(AccessLevel.NONE)
    private UUID id;

    @Column(name = "name")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private String name;

    @Column(name = "description")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private String description;

    @ManyToOne
    @JoinColumn(name = "departure_settlement_id", nullable = false)
    private SettlementEntity departureSettlement;

    @ManyToOne
    @JoinColumn(name = "destination_settlement_id", nullable = false)
    private SettlementEntity destinationSettlement;

    @OneToMany
    @JoinTable(
            name = "road_to_way",
            joinColumns = @JoinColumn( name="way_id"),
            inverseJoinColumns = @JoinColumn( name="road_id")
    )
    private List<RoadEntity> roads;

}