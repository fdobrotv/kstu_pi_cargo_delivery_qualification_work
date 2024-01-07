package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.Car;
import com.fdobrotv.cargodelivery.dto.CarIn;
import com.fdobrotv.cargodelivery.entity.CarEntity;
import com.fdobrotv.cargodelivery.entity.CarMarkEntity;
import com.fdobrotv.cargodelivery.entity.CarModelEntity;
import com.fdobrotv.cargodelivery.entity.FuelStationEntity;
import com.fdobrotv.cargodelivery.mapper.CarMapper;
import com.fdobrotv.cargodelivery.repository.CarEntityRepository;
import com.fdobrotv.cargodelivery.repository.CarMarkEntityRepository;
import com.fdobrotv.cargodelivery.repository.CarModelEntityRepository;
import com.fdobrotv.cargodelivery.service.CRUDService;
import com.fdobrotv.cargodelivery.service.EntityService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Supplier;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
public class CarServiceImpl implements CRUDService<Car, CarIn>, EntityService<CarEntity> {

    private final CarEntityRepository carEntityRepository;

    private final EntityService<CarMarkEntity> carMarkEntityService;

    private final EntityService<CarModelEntity> carModelEntityService;

    public CarServiceImpl(CarEntityRepository carEntityRepository,
                          EntityService<CarMarkEntity> carMarkEntityService,
                          EntityService<CarModelEntity> carModelEntityService) {
        this.carEntityRepository = carEntityRepository;
        this.carMarkEntityService = carMarkEntityService;
        this.carModelEntityService = carModelEntityService;
    }

    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Car by id");

    @Override
    @Transactional(readOnly = true)
    public Car getById(UUID id) {
        Optional<CarEntity> carByID = carEntityRepository.findById(id);
        return CarMapper.toDTO(carByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<CarEntity> CarEntityOptional = carEntityRepository.findById(id);
        CarEntity CarEntity = CarEntityOptional.orElseThrow(unableToFindResource);
        carEntityRepository.delete(CarEntity);
    }

    @Override
    public Car create(CarIn carIn) {
        CarMarkEntity carMarkEntity = carMarkEntityService.getEntityById(carIn.getMarkId());
        CarModelEntity carModelEntity = carModelEntityService.getEntityById(carIn.getModelId());
        CarEntity carEntity = CarMapper.toEntity(
                carIn,
                carMarkEntity,
                carModelEntity
        );
        CarEntity saved = carEntityRepository.save(carEntity);
        return CarMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Car> getList(Pageable pageable) {
        Iterable<CarEntity> all = carEntityRepository.findAll(pageable);
        return CarMapper.toDTO(all);
    }

    @Override
    @Transactional(readOnly = true)
    public CarEntity getEntityById(UUID id) {
        Optional<CarEntity> carByID = carEntityRepository.findById(id);
        return carByID.orElseThrow(unableToFindResource);
    }
}
