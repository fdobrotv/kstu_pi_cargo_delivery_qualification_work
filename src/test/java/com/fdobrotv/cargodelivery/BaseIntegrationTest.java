package com.fdobrotv.cargodelivery;

import com.fdobrotv.cargodelivery.dto.*;
import com.google.common.reflect.TypeToken;
import io.jenetics.jpx.GPX;
import io.jenetics.jpx.Track;
import io.jenetics.jpx.TrackSegment;
import io.micrometer.observation.Observation;
import lombok.extern.java.Log;
import net.bytebuddy.description.method.MethodDescription;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.io.IOException;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.nio.file.Path;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Log
@Rollback
@ExtendWith(SpringExtension.class)
@Transactional(propagation = Propagation.NESTED)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BaseIntegrationTest {

    @Autowired
    TestRestTemplate testRestTemplate;

    String gpxFileName = "geometry/GraphHopper-Track-2024-01-04-832km.gpx";

    <IN, OUT> OUT createDTO(IN inDTO, Class<OUT> outClazz) {

        String simpleName = outClazz.getSimpleName();
        String lowerCaseName = lowerCaseFirstLetter(simpleName);
        String url = "/v1/" + lowerCaseName + "s";

//        Class<Order> orderClass = Order.class;
//        Observation.CheckedFunction<OUT, Class<?>, Throwable> aClass = OUT::getClass;
//        Class<OUT> aClass1 = aClass.getClass();

//        ParameterizedTypeReference<OUT> outParameterizedTypeReference = new ParameterizedTypeReference<>() {};
//        TypeToken<OUT> typeToken = new TypeToken<OUT>(getClass()) {};
//        this.type = (Class<OUT>) typeToken.getRawType();
//        Class<OUT> outClazz = OUT.class;
        ResponseEntity<OUT> response =
                testRestTemplate.postForEntity(url, inDTO, outClazz);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        //        ResponseEntity<Void> exchange =
//                testRestTemplate.exchange(
//                        fullURL,
//                        HttpMethod.DELETE,
//                        null,
//                        Void.class);
//        Assertions.assertEquals(HttpStatus.NO_CONTENT, exchange.getStatusCode());
//
//        ResponseEntity<Void> response =
//                testRestTemplate.getForEntity(url, Void.class);
//
//        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());

        return response.getBody();
    }

    void deleteDTO(Object dto) {
        Field field;
        Object idValue;
        try {
            field = dto.getClass().getDeclaredField("id");
            field.setAccessible(true);
            idValue = field.get(dto);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            log.info("Should use DTO with id!");
            throw new RuntimeException(e);
        }

        String simpleName = dto.getClass().getSimpleName();
        String lowerCaseName = lowerCaseFirstLetter(simpleName);
        String url = "/v1/" + lowerCaseName + "s/";
        String fullURL = url + idValue;
        ResponseEntity<Void> exchange =
                testRestTemplate.exchange(
                        fullURL,
                        HttpMethod.DELETE,
                        null,
                        Void.class);
        Assertions.assertEquals(HttpStatus.NO_CONTENT, exchange.getStatusCode());

        ResponseEntity<Void> response =
                testRestTemplate.getForEntity(url, Void.class);

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    static String lowerCaseFirstLetter(String simpleName) {
        if (simpleName.isBlank())
            return simpleName;
        char[] chars = simpleName.toCharArray();
        chars[0] += 32;
        return new String(chars);
    }

    public Road createRoad(RoadIn roadIn) {
        ResponseEntity<Road> response =
                testRestTemplate.postForEntity("/v1/roads", roadIn, Road.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Road road = response.getBody();

        assertThat(road.getId()).isNotNull();
        assertThat(road.getName()).isEqualTo(roadIn.getName());
        assertThat(road.getDescription()).isEqualTo(roadIn.getDescription());
        assertThat(road.getPath()).isNotNull();
        assertThat(road.getPath()).isEqualTo(roadIn.getPath());

        return road;
    }

    static RoadIn getRoadIn(String name, String description, String gpxFileName) {
        RoadIn roadIn = new RoadIn();
        roadIn.name(name);
        roadIn.description(description);

        List<Point> points;
        try {
            Path path = new ClassPathResource(gpxFileName).getFile().toPath();
            points = GPX.read(path).tracks()
                    .flatMap(Track::segments)
                    .flatMap(TrackSegment::points)
                    .map(wp ->
                            new Point(
                                    BigDecimal.valueOf(wp.getLongitude().doubleValue()),
                                    BigDecimal.valueOf(wp.getLatitude().doubleValue()))
                    )
                    .toList();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return roadIn.path(points);
    }
}
