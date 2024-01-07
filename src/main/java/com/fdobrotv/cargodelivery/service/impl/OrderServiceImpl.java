package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.Order;
import com.fdobrotv.cargodelivery.dto.OrderIn;
import com.fdobrotv.cargodelivery.entity.RoadEntity;
import com.fdobrotv.cargodelivery.entity.SettlementEntity;
import com.fdobrotv.cargodelivery.entity.OrderEntity;
import com.fdobrotv.cargodelivery.entity.UserEntity;
import com.fdobrotv.cargodelivery.mapper.OrderMapper;
import com.fdobrotv.cargodelivery.repository.OrderEntityRepository;
import com.fdobrotv.cargodelivery.service.CRUDService;
import com.fdobrotv.cargodelivery.service.EntityService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Supplier;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
public class OrderServiceImpl implements CRUDService<Order, OrderIn> {

    private final OrderEntityRepository orderEntityRepository;

    private final EntityService<UserEntity> userEntityService;

    private final EntityService<SettlementEntity> settlementEntityService;

    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Order by id");

    public OrderServiceImpl(OrderEntityRepository orderEntityRepository,
                            EntityService<UserEntity> userEntityService,
                            EntityService<SettlementEntity> settlementEntityService) {
        this.orderEntityRepository = orderEntityRepository;
        this.userEntityService = userEntityService;
        this.settlementEntityService = settlementEntityService;
    }

    @Override
    @Transactional(readOnly = true)
    public Order getById(UUID id) {
        Optional<OrderEntity> orderByID = orderEntityRepository.findById(id);
        return OrderMapper.toDTO(orderByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<OrderEntity> OrderEntityOptional = orderEntityRepository.findById(id);
        OrderEntity OrderEntity = OrderEntityOptional.orElseThrow(unableToFindResource);
        orderEntityRepository.delete(OrderEntity);
    }

    @Override
    public Order create(OrderIn orderIn) {
        SettlementEntity departure = settlementEntityService.getEntityById(orderIn.getDepartureSettlementId());
        SettlementEntity arrival = settlementEntityService.getEntityById(orderIn.getDestinationSettlementId());
        UserEntity user = userEntityService.getEntityById(orderIn.getUserId());

        OrderEntity orderEntity = OrderMapper.toEntity(
                orderIn,
                user,
                departure,
                arrival
        );
        OrderEntity saved = orderEntityRepository.save(orderEntity);
        return OrderMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> getList(Pageable pageable) {
        Iterable<OrderEntity> all = orderEntityRepository.findAll(pageable);
        return OrderMapper.toDTO(all);
    }
}
