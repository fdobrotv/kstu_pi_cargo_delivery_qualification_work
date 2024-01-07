package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.Settlement;
import com.fdobrotv.cargodelivery.dto.Order;
import com.fdobrotv.cargodelivery.dto.OrderIn;
import com.fdobrotv.cargodelivery.dto.User;
import com.fdobrotv.cargodelivery.entity.RoadEntity;
import com.fdobrotv.cargodelivery.entity.SettlementEntity;
import com.fdobrotv.cargodelivery.entity.OrderEntity;
import com.fdobrotv.cargodelivery.entity.UserEntity;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class OrderMapper {
    public static Order toDTO(OrderEntity orderEntity) {
        Order order = new Order();
        order.id(orderEntity.getId());
        User user = UserMapper.toDTO(orderEntity.getUser());
        order.user(user);
        order.createdAt(orderEntity.getCreatedAt());
        Settlement departureSettlement = SettlementMapper.toDTO(orderEntity.getDepartureSettlement());
        order.departureSettlement(departureSettlement);
        Settlement destinationSettlement = SettlementMapper.toDTO(orderEntity.getDestinationSettlement());
        order.setDestinationSettlement(destinationSettlement);
        order.weight(orderEntity.getWeight());
        order.volume(orderEntity.getVolume());
        order.price(orderEntity.getPrice().intValue());
        return order;
    }

    public static List<Order> toDTO(List<OrderEntity> orderEntities) {
        return orderEntities.stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Order> toDTO(Iterable<OrderEntity> orderEntities) {
        Stream<OrderEntity> targetStream = StreamSupport.stream(orderEntities.spliterator(), false);
        return toDTO(targetStream.toList());
    }

    public static OrderEntity toEntity(OrderIn orderIn,
                                       UserEntity userEntity,
                                       SettlementEntity departureSettlementEntity,
                                       SettlementEntity arrivalSettlementEntity
    ) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setUser(userEntity);
        orderEntity.setCreatedAt(Instant.now().atOffset(ZoneOffset.UTC));
        orderEntity.setDepartureSettlement(departureSettlementEntity);
        orderEntity.setDestinationSettlement(arrivalSettlementEntity);
        orderEntity.setWeight(orderIn.getWeight());
        orderEntity.setVolume(orderIn.getVolume());
        orderEntity.setPrice(BigInteger.valueOf(orderIn.getPrice()));
        return orderEntity;
    }
}
