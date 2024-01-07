package com.fdobrotv.cargodelivery;

import com.fdobrotv.cargodelivery.dto.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static java.time.Instant.now;
import static java.time.ZoneOffset.*;
import static org.assertj.core.api.Assertions.assertThat;



class ControllerTests extends BaseIntegrationTest {

    @Test
    void getOrderByIdTest() {
        CarMark carMark = createCarMark("Peugeot");

        CarModel carModel = createCarModel("Traveller");

        Car car = createCar(carMark, carModel);

        Role role = createRole("Driver");

        User user = createUser("Тест", "Тестович", "Тестов", role, 1112223344, "test@email.ru");

        Driver driver = createDriver(car.getId(), user.getId());

        //https://graphhopper.com/maps/?point=55.750541%2C37.617478_Moscow%2C+Moscow%2C+Russia&point=55.782355%2C49.124227_Kazan%2C+Tatarstan%2C+Russia&profile=car&layer=Omniscale
        Point pointOfMoscow = createPoint(BigDecimal.valueOf(55.746181), BigDecimal.valueOf(37.624566));
        Settlement moscowSettlement = createSettlement("Москва", pointOfMoscow);

        Point pointOfKazan = createPoint(BigDecimal.valueOf(55.7879), BigDecimal.valueOf(49.1233));
        Settlement kazanSettlement = createSettlement("Казань", pointOfKazan);

        RoadIn roadIn = getRoadIn("Москва - Казань", "Новая дорога через М-12", gpxFileName);
        Road road = createRoad(roadIn);

        Way way = createWay("Москва - Казань", "Новый путь через М-12", moscowSettlement, kazanSettlement, List.of(road));

        //55.5009042, 43.5770082
        Point pointOfLukoil = createPoint(BigDecimal.valueOf(55.5009042), BigDecimal.valueOf(43.5770082));
        FuelStation fuelStation = createFuelStation("Лукойл", "7-ми местная заправка для грузовых машин с кафе", pointOfLukoil);

        Refuel refuel = createRefuel(BigDecimal.valueOf(16500), now(), fuelStation, car, driver);

        Point pointOfIncident = createPoint(BigDecimal.valueOf(55.5599), BigDecimal.valueOf(42.8578));
        Incident incident = createIncident("Авария - лопнула шина", now(), car, driver, pointOfIncident);

        Point pointOfStart = createPoint(BigDecimal.valueOf(55.8490), BigDecimal.valueOf(48.8498));
        Point pointOfEnd = createPoint(BigDecimal.valueOf(55.63961), BigDecimal.valueOf(42.02582));
        WorkSlot workSlot = createWorkSlot(now(), now().plusSeconds(60*60*8), car, driver, pointOfStart, pointOfEnd);

        BigDecimal weight = BigDecimal.TEN;
        BigDecimal volume = BigDecimal.TEN;
        int price = 7500;
        OrderIn orderIn = createOrderIn(user, moscowSettlement, kazanSettlement, weight, volume, price);
        Order order = createDTO(orderIn, Order.class);

        assertOrder(order, user, moscowSettlement, kazanSettlement, weight, volume, price);

        cleanup(List.of(order, workSlot, incident, refuel, fuelStation, way, road, kazanSettlement, moscowSettlement, driver, user, role, car, carModel, carMark));
    }

    private static void assertOrder(Order order, User user, Settlement moscowSettlement, Settlement kazanSettlement, BigDecimal weight, BigDecimal volume, int price) {
        assertThat(order.getId()).isNotNull();
        assertThat(order.getUser().getId()).isEqualTo(user.getId());
        assertThat(order.getCreatedAt()).isBefore(now().atOffset(UTC));
        assertThat(order.getDepartureSettlement()).isEqualTo(moscowSettlement);
        assertThat(order.getDestinationSettlement()).isEqualTo(kazanSettlement);
        assertThat(order.getWeight()).isEqualTo(weight);
        assertThat(order.getVolume()).isEqualTo(volume);
        assertThat(order.getPrice()).isEqualTo(price);
    }

    private OrderIn createOrderIn(User user, Settlement departureSettlement, Settlement destinationSettlement, BigDecimal weight, BigDecimal volume, int price) {
        OrderIn orderIn = new OrderIn();
        orderIn.userId(user.getId());
        orderIn.departureSettlementId(departureSettlement.getId());
        orderIn.destinationSettlementId(destinationSettlement.getId());
        orderIn.weight(weight);
        orderIn.volume(volume);
        orderIn.price(price);

        return orderIn;
    }

    private <E> void cleanup(List<E> order) {
        for (E dto : order) {
            deleteDTO(dto);
        }
    }

    private WorkSlot createWorkSlot(Instant startDateTime, Instant endDateTime, Car car, Driver driver, Point pointOfStart, Point pointOfEnd) {
        WorkSlotIn workSlotIn = new WorkSlotIn();
        workSlotIn.startedAt(startDateTime.atOffset(UTC));
        workSlotIn.finishedAt(endDateTime.atOffset(UTC));
        workSlotIn.carId(car.getId());
        workSlotIn.driverId(driver.getId());
        workSlotIn.startCoordinates(pointOfStart);
        workSlotIn.endCoordinates(pointOfEnd);

        ResponseEntity<WorkSlot> response =
                testRestTemplate.postForEntity("/v1/workSlots", workSlotIn, WorkSlot.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        WorkSlot workSlot = response.getBody();

        assertThat(workSlot.getId()).isNotNull();
        assertThat(workSlot.getStartedAt()).isEqualTo(startDateTime.atOffset(UTC));
        assertThat(workSlot.getFinishedAt()).isEqualTo(endDateTime.atOffset(UTC));
        assertThat(workSlot.getCar()).isEqualTo(car);
        assertThat(workSlot.getDriver()).isEqualTo(driver);
        assertThat(workSlot.getStartCoordinates()).isNotNull();
        assertThat(workSlot.getStartCoordinates()).isEqualTo(pointOfStart);
        assertThat(workSlot.getEndCoordinates()).isEqualTo(pointOfEnd);

        return workSlot;
    }

    private Incident createIncident(String description, Instant dateTime, Car car, Driver driver, Point coordinates) {
        IncidentIn incidentIn = new IncidentIn();
        incidentIn.description(description);
        incidentIn.dateTime(dateTime.atOffset(UTC));
        incidentIn.carId(car.getId());
        incidentIn.driverId(driver.getId());
        incidentIn.coordinates(coordinates);

        ResponseEntity<Incident> response =
                testRestTemplate.postForEntity("/v1/incidents", incidentIn, Incident.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Incident incident = response.getBody();

        assertThat(incident.getId()).isNotNull();
        assertThat(incident.getDescription()).isEqualTo(description);
        assertThat(incident.getDateTime()).isEqualTo(dateTime.atOffset(UTC));
        assertThat(incident.getCreatedAt()).isNotNull();
        assertThat(incident.getCreatedAt()).isBefore(now().atOffset(UTC));
        assertThat(incident.getCar()).isEqualTo(car);
        assertThat(incident.getDriver()).isEqualTo(driver);
        assertThat(incident.getCoordinates()).isNotNull();
        assertThat(incident.getCoordinates()).isEqualTo(coordinates);

        return incident;
    }

    private Refuel createRefuel(BigDecimal price, Instant dateTime, FuelStation fuelStation, Car car, Driver driver) {
        RefuelIn refuelIn = new RefuelIn();
        refuelIn.price(price);
        refuelIn.dateTime(dateTime.atOffset(UTC));
        refuelIn.fuelStationId(fuelStation.getId());
        refuelIn.carId(car.getId());
        refuelIn.driverId(driver.getId());

        ResponseEntity<Refuel> response =
                testRestTemplate.postForEntity("/v1/refuels", refuelIn, Refuel.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Refuel refuel = response.getBody();

        assertThat(refuel.getId()).isNotNull();
        assertThat(refuel.getPrice()).isEqualTo(price.intValue());
        assertThat(refuel.getDateTime()).isEqualTo(dateTime.atOffset(UTC));
        assertThat(refuel.getCreatedAt()).isNotNull();
        assertThat(refuel.getCreatedAt()).isBefore(now().atOffset(UTC));
        assertThat(refuel.getCar()).isEqualTo(car);
        assertThat(refuel.getDriver()).isEqualTo(driver);

        return refuel;
    }

    private FuelStation createFuelStation(String name, String description, Point coordinates) {
        FuelStationIn fuelStationIn = new FuelStationIn();
        fuelStationIn.name(name);
        fuelStationIn.description(description);
        fuelStationIn.coordinates(coordinates);

        ResponseEntity<FuelStation> response =
                testRestTemplate.postForEntity("/v1/fuelStations", fuelStationIn, FuelStation.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        FuelStation fuelStation = response.getBody();

        assertThat(fuelStation.getId()).isNotNull();
        assertThat(fuelStation.getName()).isEqualTo(name);
        assertThat(fuelStation.getDescription()).isEqualTo(description);
        assertThat(fuelStation.getCoordinates()).isNotNull();
        assertThat(fuelStation.getCoordinates()).isEqualTo(coordinates);

        return fuelStation;
    }

    private Way createWay(String name, String description, Settlement departure, Settlement arrival, List<Road> roads) {
        WayIn wayIn = new WayIn();
        wayIn.name(name);
        wayIn.description(description);
        wayIn.departureSettlementId(departure.getId());
        wayIn.destinationSettlementId(arrival.getId());
        List<UUID> roadIds = roads.stream().map(Road::getId).toList();
        wayIn.roadIds(roadIds);

        ResponseEntity<Way> response =
                testRestTemplate.postForEntity("/v1/ways", wayIn, Way.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Way way = response.getBody();

        assertThat(way.getId()).isNotNull();
        assertThat(way.getName()).isEqualTo(name);
        assertThat(way.getDescription()).isEqualTo(description);
        assertThat(way.getDepartureSettlement()).isNotNull();
        assertThat(way.getDepartureSettlement()).isEqualTo(departure);
        assertThat(way.getDestinationSettlement()).isNotNull();
        assertThat(way.getDestinationSettlement()).isEqualTo(arrival);
        assertThat(way.getRoads()).isNotNull();
        assertThat(way.getRoads()).hasSize(1);

        return way;
    }

    private Settlement createSettlement(String settlementName, Point coordinates) {
        SettlementIn settlementIn = new SettlementIn();
        settlementIn.name(settlementName);
        settlementIn.coordinates(coordinates);

        ResponseEntity<Settlement> response =
                testRestTemplate.postForEntity("/v1/settlements", settlementIn, Settlement.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Settlement settlement = response.getBody();

        assertThat(settlement.getId()).isNotNull();
        assertThat(settlement.getName()).isEqualTo(settlementName);
        assertThat(settlement.getCoordinates()).isEqualTo(coordinates);

        return settlement;
    }

    private Point createPoint(BigDecimal longitude, BigDecimal latitude) {
        Point point = new Point();
        point.longitude(longitude);
        point.latitude(latitude);
        return point;
    }

    private Role createRole(String name) {
        RoleIn roleIn = new RoleIn();
        roleIn.name(name);

        ResponseEntity<Role> response =
                testRestTemplate.postForEntity("/v1/roles", roleIn, Role.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Role role = response.getBody();

        assertThat(role.getId()).isNotNull();
        assertThat(role.getName()).isEqualTo(name);

        return role;
    }

    private User createUser(String firstName, String middleName, String lastName, Role role, Integer phone, String email) {
        UserIn userIn = new UserIn();
        userIn.firstName(firstName);
        userIn.lastName(lastName);
        userIn.middleName(middleName);
        userIn.roleId(role.getId());
        userIn.phone(phone.toString());
        userIn.email(email);

        ResponseEntity<User> response =
                testRestTemplate.postForEntity("/v1/users", userIn, User.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        User user = response.getBody();

        assertThat(user.getId()).isNotNull();
        assertThat(user.getFirstName()).isEqualTo(firstName);
        assertThat(user.getMiddleName()).isEqualTo(middleName);
        assertThat(user.getLastName()).isEqualTo(lastName);
        assertThat(user.getRole()).isEqualTo(role.getName());
        assertThat(user.getPhone()).isEqualTo(phone.toString());
        assertThat(user.getEmail()).isEqualTo(email);
        assertThat(user.getCreatedAt()).isBefore(now().atOffset(UTC));

        return user;
    }

    private Driver createDriver(UUID carId, UUID userId) {
        DriverIn driverIn = new DriverIn();
        driverIn.setCarId(carId);
        driverIn.setUserId(userId);

        ResponseEntity<Driver> response =
                testRestTemplate.postForEntity("/v1/drivers", driverIn, Driver.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Driver driver = response.getBody();

        assertThat(driver.getId()).isNotNull();
        assertThat(driver.getCar()).isNotNull();
        assertThat(driver.getUser()).isNotNull();

        return driver;
    }

    private Car createCar(CarMark carMark, CarModel carModel) {
        CarIn carIn = new CarIn();
        carIn.setColor(CarColor.BLACK);
        carIn.setMarkId(carMark.getId());
        carIn.setModelId(carModel.getId());
        String plateNumber = "A123TH716RUS";
        carIn.setPlateNumber(plateNumber);

        ResponseEntity<Car> response =
                testRestTemplate.postForEntity("/v1/cars", carIn, Car.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Car car = response.getBody();

        assertThat(car.getId()).isNotNull();
        assertThat(car.getPlateNumber()).isEqualTo(plateNumber);

        return car;
    }

    private CarMark createCarMark(String mark) {
        CarMarkIn carMarkIn = new CarMarkIn();
        carMarkIn.setName(mark);

        ResponseEntity<CarMark> response =
                testRestTemplate.postForEntity("/v1/carMarks", carMarkIn, CarMark.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        CarMark carMark = response.getBody();

        assertThat(carMark.getId()).isNotNull();
        assertThat(carMark.getName()).isEqualTo(mark);

        return carMark;
    }

    private CarModel createCarModel(String modelName) {
        CarModelIn carModelIn = new CarModelIn();
        carModelIn.setName(modelName);
        ResponseEntity<CarModel> response =
                testRestTemplate.postForEntity("/v1/carModels", carModelIn, CarModel.class);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        CarModel carModel = response.getBody();

        assertThat(carModel.getId()).isNotNull();
        assertThat(carModel.getName()).isEqualTo(modelName);

        return carModel;
    }

}
