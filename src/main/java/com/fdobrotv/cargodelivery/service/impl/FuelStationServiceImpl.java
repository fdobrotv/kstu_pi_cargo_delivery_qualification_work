package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.FuelStation;
import com.fdobrotv.cargodelivery.dto.FuelStationIn;
import com.fdobrotv.cargodelivery.entity.SettlementEntity;
import com.fdobrotv.cargodelivery.entity.FuelStationEntity;
import com.fdobrotv.cargodelivery.mapper.FuelStationMapper;
import com.fdobrotv.cargodelivery.repository.SettlementEntityRepository;
import com.fdobrotv.cargodelivery.repository.FuelStationEntityRepository;
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
public class FuelStationServiceImpl implements CRUDService<FuelStation, FuelStationIn>, EntityService<FuelStationEntity> {

    private final FuelStationEntityRepository fuelStationEntityRepository;

    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find FuelStation by id");

    public FuelStationServiceImpl(FuelStationEntityRepository fuelStationEntityRepository) {
        this.fuelStationEntityRepository = fuelStationEntityRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public FuelStationEntity getEntityById(UUID id) {
        Optional<FuelStationEntity> fuelStationByID = fuelStationEntityRepository.findById(id);
        return fuelStationByID.orElseThrow(unableToFindResource);
    }

    @Override
    @Transactional(readOnly = true)
    public FuelStation getById(UUID id) {
        Optional<FuelStationEntity> fuelStationByID = fuelStationEntityRepository.findById(id);
        return FuelStationMapper.toDTO(fuelStationByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<FuelStationEntity> FuelStationEntityOptional = fuelStationEntityRepository.findById(id);
        FuelStationEntity FuelStationEntity = FuelStationEntityOptional.orElseThrow(unableToFindResource);
        fuelStationEntityRepository.delete(FuelStationEntity);
    }

    @Override
    public FuelStation create(FuelStationIn fuelStationIn) {
        FuelStationEntity fuelStationEntity = FuelStationMapper.toEntity(
                fuelStationIn
        );
        FuelStationEntity saved = fuelStationEntityRepository.save(fuelStationEntity);
        return FuelStationMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FuelStation> getList(Pageable pageable) {
        Iterable<FuelStationEntity> all = fuelStationEntityRepository.findAll(pageable);
        return FuelStationMapper.toDTO(all);
    }
}
