package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.CarsApi;
import com.fdobrotv.cargodelivery.dto.Car;
import com.fdobrotv.cargodelivery.dto.CarIn;
import com.fdobrotv.cargodelivery.service.CRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.http.HttpStatus.CREATED;

@Controller
@RequestMapping("${openapi.cargoDelivery.base-path:/v1}")
public class CarController implements CarsApi {

    @Autowired
    private CRUDService<Car, CarIn> carService;

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return CarsApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteCarById(UUID id) {
        carService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Car> getCarById(UUID id) {
        Car car = carService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(car);
    }

    @Override
    public ResponseEntity<Car> createCar(CarIn carIn) {
        Car car = carService.create(carIn);
        return ResponseEntity.status(CREATED).body(car);
    }

    @Override
    public ResponseEntity<List<Car>> listCars(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<Car> cars = carService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(cars);
    }
}
