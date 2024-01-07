package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.DriversApi;
import com.fdobrotv.cargodelivery.dto.Driver;
import com.fdobrotv.cargodelivery.dto.DriverIn;
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
public class DriverController implements DriversApi {

    private CRUDService<Driver, DriverIn> driverService;

    public DriverController(CRUDService<Driver, DriverIn> driverService) {
        this.driverService = driverService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return DriversApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteDriverById(UUID id) {
        driverService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Driver> createDriver(DriverIn driverIn) {
        Driver driver = driverService.create(driverIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(driver);
    }

    @Override
    public ResponseEntity<List<Driver>> listDrivers(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<Driver> drivers = driverService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(drivers);
    }
}
