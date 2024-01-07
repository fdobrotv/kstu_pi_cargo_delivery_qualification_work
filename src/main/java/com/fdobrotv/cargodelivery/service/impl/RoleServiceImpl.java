package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.Role;
import com.fdobrotv.cargodelivery.dto.RoleIn;
import com.fdobrotv.cargodelivery.entity.RoleEntity;
import com.fdobrotv.cargodelivery.mapper.RoleMapper;
import com.fdobrotv.cargodelivery.repository.RoleEntityRepository;
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
public class RoleServiceImpl implements CRUDService<Role, RoleIn>, EntityService<RoleEntity> {

    private final RoleEntityRepository roleEntityRepository;

    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find Role by id");

    public RoleServiceImpl(RoleEntityRepository roleEntityRepository) {
        this.roleEntityRepository = roleEntityRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Role getById(UUID id) {
        Optional<RoleEntity> carByID = roleEntityRepository.findById(id);
        return RoleMapper.toDTO(carByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<RoleEntity> RoleEntityOptional = roleEntityRepository.findById(id);
        RoleEntity RoleEntity = RoleEntityOptional.orElseThrow(unableToFindResource);
        roleEntityRepository.delete(RoleEntity);
    }

    @Override
    public Role create(RoleIn roleIn) {
        RoleEntity carEntity = RoleMapper.toEntity(
                roleIn
        );
        RoleEntity saved = roleEntityRepository.save(carEntity);
        return RoleMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Role> getList(Pageable pageable) {
        Iterable<RoleEntity> all = roleEntityRepository.findAll(pageable);
        return RoleMapper.toDTO(all);
    }

    @Override
    @Transactional(readOnly = true)
    public RoleEntity getEntityById(UUID id) {
        Optional<RoleEntity> roleByID = roleEntityRepository.findById(id);
        return roleByID.orElseThrow(unableToFindResource);
    }


}
