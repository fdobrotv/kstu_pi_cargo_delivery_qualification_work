package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.UsersApi;
import com.fdobrotv.cargodelivery.dto.User;
import com.fdobrotv.cargodelivery.dto.UserIn;
import com.fdobrotv.cargodelivery.service.CRUDService;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
@RequestMapping("${openapi.cargoDelivery.base-path:/v1}")
public class UserController implements UsersApi {

    private final CRUDService<User, UserIn> userService;

    public UserController(CRUDService<User, UserIn> userService) {
        this.userService = userService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return UsersApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteUserById(UUID id) {
        userService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<User> createUser(UserIn userIn) {
        User user = userService.create(userIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @Override
    public ResponseEntity<List<User>> listUsers(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<User> users = userService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
}
