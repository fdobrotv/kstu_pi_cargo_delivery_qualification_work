package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
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
 * WorkSlotIn
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T20:25:02.083454+02:00[Europe/Sofia]")
public class WorkSlotIn {

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private OffsetDateTime startedAt;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private OffsetDateTime finishedAt;

  private UUID carId;

  private UUID driverId;

  private Point startCoordinates;

  private Point endCoordinates;

  public WorkSlotIn() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public WorkSlotIn(OffsetDateTime startedAt, OffsetDateTime finishedAt, UUID carId, UUID driverId, Point startCoordinates, Point endCoordinates) {
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.carId = carId;
    this.driverId = driverId;
    this.startCoordinates = startCoordinates;
    this.endCoordinates = endCoordinates;
  }

  public WorkSlotIn startedAt(OffsetDateTime startedAt) {
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

  public WorkSlotIn finishedAt(OffsetDateTime finishedAt) {
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

  public WorkSlotIn carId(UUID carId) {
    this.carId = carId;
    return this;
  }

  /**
   * Get carId
   * @return carId
  */
  @NotNull @Valid 
  @Schema(name = "carId", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("carId")
  public UUID getCarId() {
    return carId;
  }

  public void setCarId(UUID carId) {
    this.carId = carId;
  }

  public WorkSlotIn driverId(UUID driverId) {
    this.driverId = driverId;
    return this;
  }

  /**
   * Get driverId
   * @return driverId
  */
  @NotNull @Valid 
  @Schema(name = "driverId", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("driverId")
  public UUID getDriverId() {
    return driverId;
  }

  public void setDriverId(UUID driverId) {
    this.driverId = driverId;
  }

  public WorkSlotIn startCoordinates(Point startCoordinates) {
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

  public WorkSlotIn endCoordinates(Point endCoordinates) {
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
    WorkSlotIn workSlotIn = (WorkSlotIn) o;
    return Objects.equals(this.startedAt, workSlotIn.startedAt) &&
        Objects.equals(this.finishedAt, workSlotIn.finishedAt) &&
        Objects.equals(this.carId, workSlotIn.carId) &&
        Objects.equals(this.driverId, workSlotIn.driverId) &&
        Objects.equals(this.startCoordinates, workSlotIn.startCoordinates) &&
        Objects.equals(this.endCoordinates, workSlotIn.endCoordinates);
  }

  @Override
  public int hashCode() {
    return Objects.hash(startedAt, finishedAt, carId, driverId, startCoordinates, endCoordinates);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class WorkSlotIn {\n");
    sb.append("    startedAt: ").append(toIndentedString(startedAt)).append("\n");
    sb.append("    finishedAt: ").append(toIndentedString(finishedAt)).append("\n");
    sb.append("    carId: ").append(toIndentedString(carId)).append("\n");
    sb.append("    driverId: ").append(toIndentedString(driverId)).append("\n");
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

