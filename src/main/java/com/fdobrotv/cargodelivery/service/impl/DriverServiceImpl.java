package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.Driver;
import com.fdobrotv.cargodelivery.dto.DriverIn;
import com.fdobrotv.cargodelivery.entity.CarEntity;
import com.fdobrotv.cargodelivery.entity.DriverEntity;
import com.fdobrotv.cargodelivery.entity.UserEntity;
import com.fdobrotv.cargodelivery.mapper.DriverMapper;
import com.fdobrotv.cargodelivery.repository.CarEntityRepository;
import com.fdobrotv.cargodelivery.repository.DriverEntityRepository;
import com.fdobrotv.cargodelivery.repository.UserEntityRepository;
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
public class DriverServiceImpl implements CRUDService<Driver, DriverIn>, EntityService<DriverEntity> {

    private final DriverEntityRepository driverEntityRepository;

    private final UserEntityRepository userEntityRepository;

    private final EntityService<CarEntity> carEntityService;

    public DriverServiceImpl(DriverEntityRepository driverEntityRepository,
                             UserEntityRepository userEntityRepository,
                             EntityService<CarEntity> carEntityService) {
        this.driverEntityRepository = driverEntityRepository;
        this.userEntityRepository = userEntityRepository;
        this.carEntityService = carEntityService;
    }

    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Driver by id");

    @Override
    @Transactional(readOnly = true)
    public Driver getById(UUID id) {
        Optional<DriverEntity> driverByID = driverEntityRepository.findById(id);
        return DriverMapper.toDTO(driverByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<DriverEntity> DriverEntityOptional = driverEntityRepository.findById(id);
        DriverEntity DriverEntity = DriverEntityOptional.orElseThrow(unableToFindResource);
        driverEntityRepository.delete(DriverEntity);
    }

    @Override
    public Driver create(DriverIn driverIn) {
        CarEntity carEntity = carEntityService.getEntityById(driverIn.getCarId());
        UserEntity userEntity = getUserEntity(driverIn);
        DriverEntity driverEntity = DriverMapper.toEntity(
                carEntity,
                userEntity
        );
        DriverEntity saved = driverEntityRepository.save(driverEntity);
        return DriverMapper.toDTO(saved);
    }

    private UserEntity getUserEntity(DriverIn driverIn) {
        Optional<UserEntity> userEntityOptional = userEntityRepository.findById(driverIn.getUserId());
        Supplier<ResponseStatusException> unableToFindUserResource =
                () -> new ResponseStatusException(NOT_FOUND, "Unable to find User by id");
        return userEntityOptional.orElseThrow(unableToFindUserResource);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Driver> getList(Pageable pageable) {
        Iterable<DriverEntity> all = driverEntityRepository.findAll(pageable);
        return DriverMapper.toDTO(all);
    }

    @Override
    @Transactional(readOnly = true)
    public DriverEntity getEntityById(UUID id) {
        Optional<DriverEntity> driverByID = driverEntityRepository.findById(id);
        return driverByID.orElseThrow(unableToFindResource);
    }
}
