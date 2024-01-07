package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.math.BigDecimal;
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
 * RefuelIn
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T20:25:02.083454+02:00[Europe/Sofia]")
public class RefuelIn {

  private BigDecimal price;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private OffsetDateTime dateTime;

  private UUID fuelStationId;

  private UUID carId;

  private UUID driverId;

  public RefuelIn() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public RefuelIn(BigDecimal price, OffsetDateTime dateTime, UUID fuelStationId, UUID carId, UUID driverId) {
    this.price = price;
    this.dateTime = dateTime;
    this.fuelStationId = fuelStationId;
    this.carId = carId;
    this.driverId = driverId;
  }

  public RefuelIn price(BigDecimal price) {
    this.price = price;
    return this;
  }

  /**
   * Get price
   * @return price
  */
  @NotNull @Valid 
  @Schema(name = "price", example = "10500", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("price")
  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public RefuelIn dateTime(OffsetDateTime dateTime) {
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

  public RefuelIn fuelStationId(UUID fuelStationId) {
    this.fuelStationId = fuelStationId;
    return this;
  }

  /**
   * Get fuelStationId
   * @return fuelStationId
  */
  @NotNull @Valid 
  @Schema(name = "fuelStationId", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("fuelStationId")
  public UUID getFuelStationId() {
    return fuelStationId;
  }

  public void setFuelStationId(UUID fuelStationId) {
    this.fuelStationId = fuelStationId;
  }

  public RefuelIn carId(UUID carId) {
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

  public RefuelIn driverId(UUID driverId) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RefuelIn refuelIn = (RefuelIn) o;
    return Objects.equals(this.price, refuelIn.price) &&
        Objects.equals(this.dateTime, refuelIn.dateTime) &&
        Objects.equals(this.fuelStationId, refuelIn.fuelStationId) &&
        Objects.equals(this.carId, refuelIn.carId) &&
        Objects.equals(this.driverId, refuelIn.driverId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(price, dateTime, fuelStationId, carId, driverId);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RefuelIn {\n");
    sb.append("    price: ").append(toIndentedString(price)).append("\n");
    sb.append("    dateTime: ").append(toIndentedString(dateTime)).append("\n");
    sb.append("    fuelStationId: ").append(toIndentedString(fuelStationId)).append("\n");
    sb.append("    carId: ").append(toIndentedString(carId)).append("\n");
    sb.append("    driverId: ").append(toIndentedString(driverId)).append("\n");
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

