package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.Refuel;
import com.fdobrotv.cargodelivery.dto.RefuelIn;
import com.fdobrotv.cargodelivery.entity.*;
import com.fdobrotv.cargodelivery.mapper.RefuelMapper;
import com.fdobrotv.cargodelivery.repository.SettlementEntityRepository;
import com.fdobrotv.cargodelivery.repository.RefuelEntityRepository;
import com.fdobrotv.cargodelivery.service.CRUDService;
import com.fdobrotv.cargodelivery.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
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
public class RefuelServiceImpl implements CRUDService<Refuel, RefuelIn> {

    private final RefuelEntityRepository refuelEntityRepository;
    private final EntityService<FuelStationEntity> fuelStationEntityService;
    private final EntityService<CarEntity> carEntityService;
    private final EntityService<DriverEntity> driverEntityService;

    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Refuel by id");

    public RefuelServiceImpl(RefuelEntityRepository refuelEntityRepository,
                             EntityService<FuelStationEntity> fuelStationEntityService,
                             EntityService<CarEntity> carEntityService,
                             EntityService<DriverEntity> driverEntityService) {
        this.refuelEntityRepository = refuelEntityRepository;
        this.fuelStationEntityService = fuelStationEntityService;
        this.carEntityService = carEntityService;
        this.driverEntityService = driverEntityService;
    }

    @Override
    @Transactional(readOnly = true)
    public Refuel getById(UUID id) {
        Optional<RefuelEntity> refuelByID = refuelEntityRepository.findById(id);
        return RefuelMapper.toDTO(refuelByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<RefuelEntity> RefuelEntityOptional = refuelEntityRepository.findById(id);
        RefuelEntity RefuelEntity = RefuelEntityOptional.orElseThrow(unableToFindResource);
        refuelEntityRepository.delete(RefuelEntity);
    }

    @Override
    public Refuel create(RefuelIn refuelIn) {
        FuelStationEntity fuelStationEntity = fuelStationEntityService.getEntityById(refuelIn.getFuelStationId());
        CarEntity carEntity = carEntityService.getEntityById(refuelIn.getCarId());
        DriverEntity driverEntity = driverEntityService.getEntityById(refuelIn.getDriverId());
        RefuelEntity refuelEntity = RefuelMapper.toEntity(
                refuelIn,
                fuelStationEntity,
                carEntity,
                driverEntity
        );
        RefuelEntity saved = refuelEntityRepository.save(refuelEntity);
        return RefuelMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Refuel> getList(Pageable pageable) {
        Iterable<RefuelEntity> all = refuelEntityRepository.findAll(pageable);
        return RefuelMapper.toDTO(all);
    }
}
