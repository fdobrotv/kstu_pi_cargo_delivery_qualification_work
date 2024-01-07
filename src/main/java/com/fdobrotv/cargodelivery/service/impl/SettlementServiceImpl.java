package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.Settlement;
import com.fdobrotv.cargodelivery.dto.SettlementIn;
import com.fdobrotv.cargodelivery.entity.SettlementEntity;
import com.fdobrotv.cargodelivery.mapper.SettlementMapper;
import com.fdobrotv.cargodelivery.repository.SettlementEntityRepository;
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
public class SettlementServiceImpl implements CRUDService<Settlement, SettlementIn>, EntityService<SettlementEntity> {

    private final SettlementEntityRepository settlementEntityRepository;
    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Settlement by id");

    public SettlementServiceImpl(SettlementEntityRepository settlementEntityRepository) {
        this.settlementEntityRepository = settlementEntityRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Settlement getById(UUID id) {
        Optional<SettlementEntity> settlementByID = settlementEntityRepository.findById(id);
        return SettlementMapper.toDTO(settlementByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<SettlementEntity> SettlementEntityOptional = settlementEntityRepository.findById(id);
        SettlementEntity SettlementEntity = SettlementEntityOptional.orElseThrow(unableToFindResource);
        settlementEntityRepository.delete(SettlementEntity);
    }

    @Override
    public Settlement create(SettlementIn settlementIn) {
        SettlementEntity settlementEntity = SettlementMapper.toEntity(
                settlementIn
        );
        SettlementEntity saved = settlementEntityRepository.save(settlementEntity);
        return SettlementMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Settlement> getList(Pageable pageable) {
        Iterable<SettlementEntity> all = settlementEntityRepository.findAll(pageable);
        return SettlementMapper.toDTO(all);
    }

    @Override
    @Transactional(readOnly = true)
    public SettlementEntity getEntityById(UUID id) {
        Optional<SettlementEntity> settlementByID = settlementEntityRepository.findById(id);
        return settlementByID.orElseThrow(unableToFindResource);
    }
}
