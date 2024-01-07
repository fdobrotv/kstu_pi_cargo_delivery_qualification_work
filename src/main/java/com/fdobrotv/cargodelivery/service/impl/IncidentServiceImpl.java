package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.Incident;
import com.fdobrotv.cargodelivery.dto.IncidentIn;
import com.fdobrotv.cargodelivery.entity.CarEntity;
import com.fdobrotv.cargodelivery.entity.DriverEntity;
import com.fdobrotv.cargodelivery.entity.FuelStationEntity;
import com.fdobrotv.cargodelivery.entity.IncidentEntity;
import com.fdobrotv.cargodelivery.mapper.IncidentMapper;
import com.fdobrotv.cargodelivery.repository.IncidentEntityRepository;
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
public class IncidentServiceImpl implements CRUDService<Incident, IncidentIn> {

    @Autowired
    private IncidentEntityRepository incidentEntityRepository;
    @Autowired
    private EntityService<CarEntity> carEntityService;
    @Autowired
    private EntityService<DriverEntity> driverEntityService;

    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Incident by id");

    @Override
    @Transactional(readOnly = true)
    public Incident getById(UUID id) {
        Optional<IncidentEntity> incidentByID = incidentEntityRepository.findById(id);
        return IncidentMapper.toDTO(incidentByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<IncidentEntity> IncidentEntityOptional = incidentEntityRepository.findById(id);
        IncidentEntity IncidentEntity = IncidentEntityOptional.orElseThrow(unableToFindResource);
        incidentEntityRepository.delete(IncidentEntity);
    }

    @Override
    public Incident create(IncidentIn incidentIn) {
        CarEntity carEntity = carEntityService.getEntityById(incidentIn.getCarId());
        DriverEntity driverEntity = driverEntityService.getEntityById(incidentIn.getDriverId());
        IncidentEntity incidentEntity = IncidentMapper.toEntity(
                incidentIn,
                carEntity,
                driverEntity
        );
        IncidentEntity saved = incidentEntityRepository.save(incidentEntity);
        return IncidentMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Incident> getList(Pageable pageable) {
        Iterable<IncidentEntity> all = incidentEntityRepository.findAll(pageable);
        return IncidentMapper.toDTO(all);
    }
}
