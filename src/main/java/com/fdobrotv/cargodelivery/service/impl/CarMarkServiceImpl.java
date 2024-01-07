package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.CarMark;
import com.fdobrotv.cargodelivery.dto.CarMarkIn;
import com.fdobrotv.cargodelivery.entity.CarMarkEntity;
import com.fdobrotv.cargodelivery.mapper.CarMarkMapper;
import com.fdobrotv.cargodelivery.repository.CarMarkEntityRepository;
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
public class CarMarkServiceImpl implements CRUDService<CarMark, CarMarkIn>, EntityService<CarMarkEntity> {

    private final CarMarkEntityRepository carMarkEntityRepository;
    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Car Mark by id");

    public CarMarkServiceImpl(CarMarkEntityRepository carMarkEntityRepository) {
        this.carMarkEntityRepository = carMarkEntityRepository;
    }

    @Override
    public CarMark getById(UUID id) {
        Optional<CarMarkEntity> carMarkEntity = carMarkEntityRepository.findById(id);
        return CarMarkMapper.toDTO(carMarkEntity.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<CarMarkEntity> carMarkEntityOptional = carMarkEntityRepository.findById(id);
        CarMarkEntity carMarkEntity = carMarkEntityOptional.orElseThrow(unableToFindResource);
        carMarkEntityRepository.delete(carMarkEntity);
    }

    @Override
    public CarMark create(CarMarkIn carMarkIn) {
        CarMarkEntity carMarkEntity = CarMarkMapper.toEntity(carMarkIn);
        CarMarkEntity saved = carMarkEntityRepository.save(carMarkEntity);
        return CarMarkMapper.toDTO(saved);
    }

    @Override
    public List<CarMark> getList(Pageable pageable) {
        Iterable<CarMarkEntity> all = carMarkEntityRepository.findAll(pageable);
        return CarMarkMapper.toDTO(all);
    }

    @Override
    public CarMarkEntity getEntityById(UUID id) {
        Optional<CarMarkEntity> carMarkEntity = carMarkEntityRepository.findById(id);
        return carMarkEntity.orElseThrow(unableToFindResource);
    }
}
