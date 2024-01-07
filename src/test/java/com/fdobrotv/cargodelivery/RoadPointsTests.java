package com.fdobrotv.cargodelivery;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fdobrotv.cargodelivery.dto.*;
import com.fdobrotv.cargodelivery.service.CRUDService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;


class RoadPointsTests extends BaseIntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CRUDService<Road, RoadIn> roadService;

    @Test
    void pointsShouldWorkTest() {

        RoadIn roadIn = getRoadIn("Москва - Казань", "Новая дорога через М-12", gpxFileName);
        try {
            String json = objectMapper.writeValueAsString(roadIn);
            RoadIn roadInDeserialized = objectMapper.readValue(json, RoadIn.class);
            Road roadDeserialized = objectMapper.readValue(json, Road.class);

            Road road = roadService.create(roadInDeserialized);

            String roadString = objectMapper.writeValueAsString(road);
            ObjectReader objectReader = objectMapper.reader().forType(Road.class);
            objectReader.readValue(roadString);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Road road = createRoad(roadIn);

        deleteDTO(road);
    }
}
