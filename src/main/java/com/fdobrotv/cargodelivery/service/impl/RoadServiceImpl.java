package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.Road;
import com.fdobrotv.cargodelivery.dto.RoadIn;
import com.fdobrotv.cargodelivery.entity.CarEntity;
import com.fdobrotv.cargodelivery.entity.RoadEntity;
import com.fdobrotv.cargodelivery.mapper.RoadMapper;
import com.fdobrotv.cargodelivery.repository.RoadEntityRepository;
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
public class RoadServiceImpl implements CRUDService<Road, RoadIn>, EntityService<RoadEntity> {

    private final RoadEntityRepository roadEntityRepository;
    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Road by id");

    public RoadServiceImpl(RoadEntityRepository roadEntityRepository) {
        this.roadEntityRepository = roadEntityRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Road getById(UUID id) {
        Optional<RoadEntity> roadByID = roadEntityRepository.findById(id);
        return RoadMapper.toDTO(roadByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<RoadEntity> RoadEntityOptional = roadEntityRepository.findById(id);
        RoadEntity RoadEntity = RoadEntityOptional.orElseThrow(unableToFindResource);
        roadEntityRepository.delete(RoadEntity);
    }

    @Override
    public Road create(RoadIn roadIn) {
        RoadEntity roadEntity = RoadMapper.toEntity(
                roadIn
        );
        RoadEntity saved = roadEntityRepository.save(roadEntity);
        return RoadMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Road> getList(Pageable pageable) {
        Iterable<RoadEntity> all = roadEntityRepository.findAll(pageable);
        return RoadMapper.toDTO(all);
    }

    @Override
    public RoadEntity getEntityById(UUID id) {
        Optional<RoadEntity> roadEntityById = roadEntityRepository.findById(id);
        return roadEntityById.orElseThrow(unableToFindResource);
    }
}
