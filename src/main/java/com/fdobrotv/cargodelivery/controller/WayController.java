package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.WaysApi;
import com.fdobrotv.cargodelivery.dto.Way;
import com.fdobrotv.cargodelivery.dto.WayIn;
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
public class WayController implements WaysApi {

    private final CRUDService<Way, WayIn> wayService;

    public WayController(CRUDService<Way, WayIn> wayService) {
        this.wayService = wayService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return WaysApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteWayById(UUID id) {
        wayService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Way> createWay(WayIn wayIn) {
        Way way = wayService.create(wayIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(way);
    }

    @Override
    public ResponseEntity<List<Way>> listWays(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<Way> ways = wayService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(ways);
    }
}
