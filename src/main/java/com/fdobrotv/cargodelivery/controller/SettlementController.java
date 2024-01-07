package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.SettlementsApi;
import com.fdobrotv.cargodelivery.dto.Settlement;
import com.fdobrotv.cargodelivery.dto.SettlementIn;
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
public class SettlementController implements SettlementsApi {

    private final CRUDService<Settlement, SettlementIn> settlementService;

    public SettlementController(CRUDService<Settlement, SettlementIn> settlementService) {
        this.settlementService = settlementService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return SettlementsApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteSettlementById(UUID id) {
        settlementService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Settlement> createSettlement(SettlementIn settlementIn) {
        Settlement settlement = settlementService.create(settlementIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(settlement);
    }

    @Override
    public ResponseEntity<List<Settlement>> listSettlements(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<Settlement> settlements = settlementService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(settlements);
    }
}
