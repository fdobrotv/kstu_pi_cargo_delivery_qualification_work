package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.Way;
import com.fdobrotv.cargodelivery.dto.WayIn;
import com.fdobrotv.cargodelivery.entity.RoadEntity;
import com.fdobrotv.cargodelivery.entity.SettlementEntity;
import com.fdobrotv.cargodelivery.entity.WayEntity;
import com.fdobrotv.cargodelivery.mapper.WayMapper;
import com.fdobrotv.cargodelivery.repository.WayEntityRepository;
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
public class WayServiceImpl implements CRUDService<Way, WayIn> {

    private final WayEntityRepository wayEntityRepository;

    private final EntityService<SettlementEntity> settlementEntityService;

    private final EntityService<RoadEntity> roadEntityService;

    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Way by id");

    public WayServiceImpl(WayEntityRepository wayEntityRepository,
                          EntityService<SettlementEntity> settlementEntityService,
                          EntityService<RoadEntity> roadEntityService) {
        this.wayEntityRepository = wayEntityRepository;
        this.settlementEntityService = settlementEntityService;
        this.roadEntityService = roadEntityService;
    }

    @Override
    @Transactional(readOnly = true)
    public Way getById(UUID id) {
        Optional<WayEntity> wayByID = wayEntityRepository.findById(id);
        return WayMapper.toDTO(wayByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<WayEntity> WayEntityOptional = wayEntityRepository.findById(id);
        WayEntity WayEntity = WayEntityOptional.orElseThrow(unableToFindResource);
        wayEntityRepository.delete(WayEntity);
    }

    @Override
    public Way create(WayIn wayIn) {
        SettlementEntity departure = settlementEntityService.getEntityById(wayIn.getDepartureSettlementId());
        SettlementEntity destination = settlementEntityService.getEntityById(wayIn.getDestinationSettlementId());
        List<RoadEntity> roads = wayIn.getRoadIds().stream().map(roadEntityService::getEntityById).toList();

        WayEntity wayEntity = WayMapper.toEntity(
                wayIn,
                departure,
                destination,
                roads
        );
        WayEntity saved = wayEntityRepository.save(wayEntity);
        return WayMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Way> getList(Pageable pageable) {
        Iterable<WayEntity> all = wayEntityRepository.findAll(pageable);
        return WayMapper.toDTO(all);
    }
}
