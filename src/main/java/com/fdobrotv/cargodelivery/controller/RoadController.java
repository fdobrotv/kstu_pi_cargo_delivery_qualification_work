package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.RoadsApi;
import com.fdobrotv.cargodelivery.dto.Road;
import com.fdobrotv.cargodelivery.dto.RoadIn;
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
public class RoadController implements RoadsApi {

    private CRUDService<Road, RoadIn> roadService;

    public RoadController(CRUDService<Road, RoadIn> roadService) {
        this.roadService = roadService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return RoadsApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteRoadById(UUID id) {
        roadService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Road> createRoad(RoadIn roadIn) {
        Road road = roadService.create(roadIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(road);
    }

    @Override
    public ResponseEntity<List<Road>> listRoads(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<Road> roads = roadService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(roads);
    }
}
