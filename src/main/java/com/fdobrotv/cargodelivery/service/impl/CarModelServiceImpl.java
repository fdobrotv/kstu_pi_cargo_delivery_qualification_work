package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.CarModel;
import com.fdobrotv.cargodelivery.dto.CarModelIn;
import com.fdobrotv.cargodelivery.entity.CarMarkEntity;
import com.fdobrotv.cargodelivery.entity.CarModelEntity;
import com.fdobrotv.cargodelivery.mapper.CarModelMapper;
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
public class CarModelServiceImpl implements CRUDService<CarModel, CarModelIn>, EntityService<CarModelEntity> {

    private final CarModelEntityRepository carModelEntityRepository;
    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Car Mark by id");

    public CarModelServiceImpl(CarModelEntityRepository carModelEntityRepository) {
        this.carModelEntityRepository = carModelEntityRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public CarModel getById(UUID id) {
        Optional<CarModelEntity> carModelEntityOptional = carModelEntityRepository.findById(id);
        return CarModelMapper.toDTO(carModelEntityOptional.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<CarModelEntity> carModelEntityOptional = carModelEntityRepository.findById(id);
        CarModelEntity carModelEntity = carModelEntityOptional.orElseThrow(unableToFindResource);
        carModelEntityRepository.delete(carModelEntity);
    }

    @Override
    public CarModel create(CarModelIn carModelIn) {
        CarModelEntity carModelEntity = CarModelMapper.toEntity(carModelIn);
        CarModelEntity saved = carModelEntityRepository.save(carModelEntity);
        return CarModelMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarModel> getList(Pageable pageable) {
        Iterable<CarModelEntity> all = carModelEntityRepository.findAll(pageable);
        return CarModelMapper.toDTO(all);
    }

    @Override
    @Transactional(readOnly = true)
    public CarModelEntity getEntityById(UUID id) {
        Optional<CarModelEntity> carModelEntityOptional = carModelEntityRepository.findById(id);
        return carModelEntityOptional.orElseThrow(unableToFindResource);
    }
}
