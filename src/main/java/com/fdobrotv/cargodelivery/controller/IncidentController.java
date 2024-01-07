package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.IncidentsApi;
import com.fdobrotv.cargodelivery.dto.Incident;
import com.fdobrotv.cargodelivery.dto.IncidentIn;
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
public class IncidentController implements IncidentsApi {

    private final CRUDService<Incident, IncidentIn> incidentService;

    public IncidentController(CRUDService<Incident, IncidentIn> incidentService) {
        this.incidentService = incidentService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return IncidentsApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteIncidentById(UUID id) {
        incidentService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Incident> getIncidentById(UUID id) {
        Incident incidents = incidentService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(incidents);
    }

    @Override
    public ResponseEntity<Incident> createIncident(IncidentIn incidentIn) {
        Incident incident = incidentService.create(incidentIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(incident);
    }

    @Override
    public ResponseEntity<List<Incident>> listIncidents(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<Incident> incidents = incidentService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(incidents);
    }
}
