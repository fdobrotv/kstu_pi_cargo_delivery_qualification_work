package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fdobrotv.cargodelivery.dto.Car;
import com.fdobrotv.cargodelivery.dto.Driver;
import com.fdobrotv.cargodelivery.dto.FuelStation;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.springframework.format.annotation.DateTimeFormat;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * Refuel
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T13:43:58.566610636+03:00[Europe/Moscow]")
public class Refuel {

  private UUID id;

  private Integer price;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private OffsetDateTime createdAt;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private OffsetDateTime dateTime;

  private FuelStation fuelStation;

  private Car car;

  private Driver driver;

  public Refuel() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public Refuel(UUID id, Integer price, OffsetDateTime createdAt, OffsetDateTime dateTime, FuelStation fuelStation, Car car, Driver driver) {
    this.id = id;
    this.price = price;
    this.createdAt = createdAt;
    this.dateTime = dateTime;
    this.fuelStation = fuelStation;
    this.car = car;
    this.driver = driver;
  }

  public Refuel id(UUID id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
  */
  @NotNull @Valid 
  @Schema(name = "id", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("id")
  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public Refuel price(Integer price) {
    this.price = price;
    return this;
  }

  /**
   * Get price
   * @return price
  */
  @NotNull 
  @Schema(name = "price", example = "10500", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("price")
  public Integer getPrice() {
    return price;
  }

  public void setPrice(Integer price) {
    this.price = price;
  }

  public Refuel createdAt(OffsetDateTime createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * Get createdAt
   * @return createdAt
  */
  @NotNull @Valid 
  @Schema(name = "createdAt", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("createdAt")
  public OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(OffsetDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public Refuel dateTime(OffsetDateTime dateTime) {
    this.dateTime = dateTime;
    return this;
  }

  /**
   * Get dateTime
   * @return dateTime
  */
  @NotNull @Valid 
  @Schema(name = "dateTime", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("dateTime")
  public OffsetDateTime getDateTime() {
    return dateTime;
  }

  public void setDateTime(OffsetDateTime dateTime) {
    this.dateTime = dateTime;
  }

  public Refuel fuelStation(FuelStation fuelStation) {
    this.fuelStation = fuelStation;
    return this;
  }

  /**
   * Get fuelStation
   * @return fuelStation
  */
  @NotNull @Valid 
  @Schema(name = "fuelStation", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("fuelStation")
  public FuelStation getFuelStation() {
    return fuelStation;
  }

  public void setFuelStation(FuelStation fuelStation) {
    this.fuelStation = fuelStation;
  }

  public Refuel car(Car car) {
    this.car = car;
    return this;
  }

  /**
   * Get car
   * @return car
  */
  @NotNull @Valid 
  @Schema(name = "car", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("car")
  public Car getCar() {
    return car;
  }

  public void setCar(Car car) {
    this.car = car;
  }

  public Refuel driver(Driver driver) {
    this.driver = driver;
    return this;
  }

  /**
   * Get driver
   * @return driver
  */
  @NotNull @Valid 
  @Schema(name = "driver", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("driver")
  public Driver getDriver() {
    return driver;
  }

  public void setDriver(Driver driver) {
    this.driver = driver;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Refuel refuel = (Refuel) o;
    return Objects.equals(this.id, refuel.id) &&
        Objects.equals(this.price, refuel.price) &&
        Objects.equals(this.createdAt, refuel.createdAt) &&
        Objects.equals(this.dateTime, refuel.dateTime) &&
        Objects.equals(this.fuelStation, refuel.fuelStation) &&
        Objects.equals(this.car, refuel.car) &&
        Objects.equals(this.driver, refuel.driver);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, price, createdAt, dateTime, fuelStation, car, driver);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Refuel {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    price: ").append(toIndentedString(price)).append("\n");
    sb.append("    createdAt: ").append(toIndentedString(createdAt)).append("\n");
    sb.append("    dateTime: ").append(toIndentedString(dateTime)).append("\n");
    sb.append("    fuelStation: ").append(toIndentedString(fuelStation)).append("\n");
    sb.append("    car: ").append(toIndentedString(car)).append("\n");
    sb.append("    driver: ").append(toIndentedString(driver)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

