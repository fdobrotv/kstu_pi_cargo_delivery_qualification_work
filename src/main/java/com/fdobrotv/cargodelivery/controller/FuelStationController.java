package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.FuelStationsApi;
import com.fdobrotv.cargodelivery.dto.FuelStation;
import com.fdobrotv.cargodelivery.dto.FuelStationIn;
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
public class FuelStationController implements FuelStationsApi {

    private final CRUDService<FuelStation, FuelStationIn> fuelStationService;

    public FuelStationController(CRUDService<FuelStation, FuelStationIn> fuelStationService) {
        this.fuelStationService = fuelStationService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return FuelStationsApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteFuelStationById(UUID id) {
        fuelStationService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<FuelStation> getFuelStationById(UUID id) {
        FuelStation fuelStations = fuelStationService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(fuelStations);
    }

    @Override
    public ResponseEntity<FuelStation> createFuelStation(FuelStationIn fuelStationIn) {
        FuelStation fuelStation = fuelStationService.create(fuelStationIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(fuelStation);
    }

    @Override
    public ResponseEntity<List<FuelStation>> listFuelStations(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<FuelStation> fuelStations = fuelStationService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(fuelStations);
    }
}
