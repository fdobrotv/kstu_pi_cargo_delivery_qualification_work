package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.WorkSlot;
import com.fdobrotv.cargodelivery.dto.WorkSlotIn;
import com.fdobrotv.cargodelivery.entity.CarEntity;
import com.fdobrotv.cargodelivery.entity.DriverEntity;
import com.fdobrotv.cargodelivery.entity.WorkSlotEntity;
import com.fdobrotv.cargodelivery.mapper.WorkSlotMapper;
import com.fdobrotv.cargodelivery.repository.WorkSlotEntityRepository;
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
public class WorkSlotServiceImpl implements CRUDService<WorkSlot, WorkSlotIn> {

    private final WorkSlotEntityRepository workSlotEntityRepository;
    private final EntityService<CarEntity> carEntityService;
    private final EntityService<DriverEntity> driverEntityService;

    public WorkSlotServiceImpl(WorkSlotEntityRepository workSlotEntityRepository,
                               EntityService<CarEntity> carEntityService,
                               EntityService<DriverEntity> driverEntityService) {
        this.workSlotEntityRepository = workSlotEntityRepository;
        this.carEntityService = carEntityService;
        this.driverEntityService = driverEntityService;
    }

    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find WorkSlot by id");

    @Override
    @Transactional(readOnly = true)
    public WorkSlot getById(UUID id) {
        Optional<WorkSlotEntity> workSlotByID = workSlotEntityRepository.findById(id);
        return WorkSlotMapper.toDTO(workSlotByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<WorkSlotEntity> WorkSlotEntityOptional = workSlotEntityRepository.findById(id);
        WorkSlotEntity WorkSlotEntity = WorkSlotEntityOptional.orElseThrow(unableToFindResource);
        workSlotEntityRepository.delete(WorkSlotEntity);
    }

    @Override
    public WorkSlot create(WorkSlotIn workSlotIn) {
        CarEntity carEntity = carEntityService.getEntityById(workSlotIn.getCarId());
        DriverEntity driverEntity = driverEntityService.getEntityById(workSlotIn.getDriverId());
        WorkSlotEntity workSlotEntity = WorkSlotMapper.toEntity(
                workSlotIn,
                carEntity,
                driverEntity
        );
        WorkSlotEntity saved = workSlotEntityRepository.save(workSlotEntity);
        return WorkSlotMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkSlot> getList(Pageable pageable) {
        Iterable<WorkSlotEntity> all = workSlotEntityRepository.findAll(pageable);
        return WorkSlotMapper.toDTO(all);
    }
}
