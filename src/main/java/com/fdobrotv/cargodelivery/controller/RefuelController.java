package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.RefuelsApi;
import com.fdobrotv.cargodelivery.dto.Refuel;
import com.fdobrotv.cargodelivery.dto.RefuelIn;
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
public class RefuelController implements RefuelsApi {

    private CRUDService<Refuel, RefuelIn> refuelService;

    public RefuelController(CRUDService<Refuel, RefuelIn> refuelService) {
        this.refuelService = refuelService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return RefuelsApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteRefuelById(UUID id) {
        refuelService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Refuel> createRefuel(RefuelIn refuelIn) {
        Refuel refuel = refuelService.create(refuelIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(refuel);
    }

    @Override
    public ResponseEntity<List<Refuel>> listRefuels(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<Refuel> refuels = refuelService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(refuels);
    }
}
