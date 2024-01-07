package com.fdobrotv.cargodelivery.service.impl;

import com.fdobrotv.cargodelivery.dto.User;
import com.fdobrotv.cargodelivery.dto.UserIn;
import com.fdobrotv.cargodelivery.entity.RoleEntity;
import com.fdobrotv.cargodelivery.entity.UserEntity;
import com.fdobrotv.cargodelivery.mapper.UserMapper;
import com.fdobrotv.cargodelivery.repository.RoleEntityRepository;
import com.fdobrotv.cargodelivery.repository.UserEntityRepository;
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
public class UserServiceImpl implements CRUDService<User, UserIn>, EntityService<UserEntity> {

    private final UserEntityRepository userEntityRepository;
    private final EntityService<RoleEntity> roleEntityService;

    private final Supplier<ResponseStatusException> unableToFindResource =
            () -> new ResponseStatusException(NOT_FOUND, "Unable to find User by id");

    public UserServiceImpl(UserEntityRepository userEntityRepository, EntityService<RoleEntity> roleEntityService) {
        this.userEntityRepository = userEntityRepository;
        this.roleEntityService = roleEntityService;
    }

    @Override
    @Transactional(readOnly = true)
    public User getById(UUID id) {
        Optional<UserEntity> userByID = userEntityRepository.findById(id);
        return UserMapper.toDTO(userByID.orElseThrow(unableToFindResource));
    }

    @Override
    public void deleteById(UUID id) {
        Optional<UserEntity> UserEntityOptional = userEntityRepository.findById(id);
        UserEntity UserEntity = UserEntityOptional.orElseThrow(unableToFindResource);
        userEntityRepository.delete(UserEntity);
    }

    @Override
    public User create(UserIn userIn) {
        RoleEntity roleEntity = roleEntityService.getEntityById(userIn.getRoleId());
        UserEntity userEntity = UserMapper.toEntity(
                userIn,
                roleEntity
        );
        UserEntity saved = userEntityRepository.save(userEntity);
        return UserMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getList(Pageable pageable) {
        Iterable<UserEntity> all = userEntityRepository.findAll(pageable);
        return UserMapper.toDTO(all);
    }

    @Override
    @Transactional(readOnly = true)
    public UserEntity getEntityById(UUID id) {
        Optional<UserEntity> userByID = userEntityRepository.findById(id);
        return userByID.orElseThrow(unableToFindResource);
    }
}
