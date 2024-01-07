package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fdobrotv.cargodelivery.dto.Car;
import com.fdobrotv.cargodelivery.dto.Driver;
import com.fdobrotv.cargodelivery.dto.Point;
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
 * WorkSlot
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T20:25:02.083454+02:00[Europe/Sofia]")
public class WorkSlot {

  private UUID id;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private OffsetDateTime startedAt;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private OffsetDateTime finishedAt;

  private Car car;

  private Driver driver;

  private Point startCoordinates;

  private Point endCoordinates;

  public WorkSlot() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public WorkSlot(UUID id, OffsetDateTime startedAt, OffsetDateTime finishedAt, Car car, Driver driver, Point startCoordinates, Point endCoordinates) {
    this.id = id;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.car = car;
    this.driver = driver;
    this.startCoordinates = startCoordinates;
    this.endCoordinates = endCoordinates;
  }

  public WorkSlot id(UUID id) {
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

  public WorkSlot startedAt(OffsetDateTime startedAt) {
    this.startedAt = startedAt;
    return this;
  }

  /**
   * Get startedAt
   * @return startedAt
  */
  @NotNull @Valid 
  @Schema(name = "startedAt", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("startedAt")
  public OffsetDateTime getStartedAt() {
    return startedAt;
  }

  public void setStartedAt(OffsetDateTime startedAt) {
    this.startedAt = startedAt;
  }

  public WorkSlot finishedAt(OffsetDateTime finishedAt) {
    this.finishedAt = finishedAt;
    return this;
  }

  /**
   * Get finishedAt
   * @return finishedAt
  */
  @NotNull @Valid 
  @Schema(name = "finishedAt", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("finishedAt")
  public OffsetDateTime getFinishedAt() {
    return finishedAt;
  }

  public void setFinishedAt(OffsetDateTime finishedAt) {
    this.finishedAt = finishedAt;
  }

  public WorkSlot car(Car car) {
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

  public WorkSlot driver(Driver driver) {
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

  public WorkSlot startCoordinates(Point startCoordinates) {
    this.startCoordinates = startCoordinates;
    return this;
  }

  /**
   * Get startCoordinates
   * @return startCoordinates
  */
  @NotNull @Valid 
  @Schema(name = "startCoordinates", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("startCoordinates")
  public Point getStartCoordinates() {
    return startCoordinates;
  }

  public void setStartCoordinates(Point startCoordinates) {
    this.startCoordinates = startCoordinates;
  }

  public WorkSlot endCoordinates(Point endCoordinates) {
    this.endCoordinates = endCoordinates;
    return this;
  }

  /**
   * Get endCoordinates
   * @return endCoordinates
  */
  @NotNull @Valid 
  @Schema(name = "endCoordinates", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("endCoordinates")
  public Point getEndCoordinates() {
    return endCoordinates;
  }

  public void setEndCoordinates(Point endCoordinates) {
    this.endCoordinates = endCoordinates;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    WorkSlot workSlot = (WorkSlot) o;
    return Objects.equals(this.id, workSlot.id) &&
        Objects.equals(this.startedAt, workSlot.startedAt) &&
        Objects.equals(this.finishedAt, workSlot.finishedAt) &&
        Objects.equals(this.car, workSlot.car) &&
        Objects.equals(this.driver, workSlot.driver) &&
        Objects.equals(this.startCoordinates, workSlot.startCoordinates) &&
        Objects.equals(this.endCoordinates, workSlot.endCoordinates);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, startedAt, finishedAt, car, driver, startCoordinates, endCoordinates);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class WorkSlot {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    startedAt: ").append(toIndentedString(startedAt)).append("\n");
    sb.append("    finishedAt: ").append(toIndentedString(finishedAt)).append("\n");
    sb.append("    car: ").append(toIndentedString(car)).append("\n");
    sb.append("    driver: ").append(toIndentedString(driver)).append("\n");
    sb.append("    startCoordinates: ").append(toIndentedString(startCoordinates)).append("\n");
    sb.append("    endCoordinates: ").append(toIndentedString(endCoordinates)).append("\n");
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

