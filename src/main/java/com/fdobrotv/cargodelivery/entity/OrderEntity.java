package com.fdobrotv.cargodelivery.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "order")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    @Setter(AccessLevel.NONE)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    @JdbcTypeCode(SqlTypes.TIMESTAMP_WITH_TIMEZONE)
    private OffsetDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "departure_settlement_id", nullable = false)
    private SettlementEntity departureSettlement;

    @ManyToOne
    @JoinColumn(name = "destination_settlement_id", nullable = false)
    private SettlementEntity destinationSettlement;

    @Column(name = "weight", nullable = false)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private BigDecimal weight;

    @Column(name = "volume", nullable = false)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private BigDecimal volume;

    @Column(name = "price", nullable = false)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private BigInteger price;

}