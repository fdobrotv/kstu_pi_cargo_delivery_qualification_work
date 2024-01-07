package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.WorkSlotsApi;
import com.fdobrotv.cargodelivery.dto.WorkSlot;
import com.fdobrotv.cargodelivery.dto.WorkSlotIn;
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
public class WorkSlotController implements WorkSlotsApi {

    private final CRUDService<WorkSlot, WorkSlotIn> workSlotService;

    public WorkSlotController(CRUDService<WorkSlot, WorkSlotIn> workSlotService) {
        this.workSlotService = workSlotService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return WorkSlotsApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteWorkSlotById(UUID id) {
        workSlotService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<WorkSlot> getWorkSlotById(UUID id) {
        WorkSlot workSlots = workSlotService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(workSlots);
    }

    @Override
    public ResponseEntity<WorkSlot> createWorkSlot(WorkSlotIn workSlotIn) {
        WorkSlot workSlot = workSlotService.create(workSlotIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(workSlot);
    }

    @Override
    public ResponseEntity<List<WorkSlot>> listWorkSlots(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<WorkSlot> workSlots = workSlotService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(workSlots);
    }
}
