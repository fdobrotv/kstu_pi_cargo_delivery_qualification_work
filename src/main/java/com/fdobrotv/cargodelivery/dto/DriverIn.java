package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.UUID;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * DriverIn
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T20:25:02.083454+02:00[Europe/Sofia]")
public class DriverIn {

  private UUID userId;

  private UUID carId;

  public DriverIn() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public DriverIn(UUID userId, UUID carId) {
    this.userId = userId;
    this.carId = carId;
  }

  public DriverIn userId(UUID userId) {
    this.userId = userId;
    return this;
  }

  /**
   * Get userId
   * @return userId
  */
  @NotNull @Valid 
  @Schema(name = "userId", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("userId")
  public UUID getUserId() {
    return userId;
  }

  public void setUserId(UUID userId) {
    this.userId = userId;
  }

  public DriverIn carId(UUID carId) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DriverIn driverIn = (DriverIn) o;
    return Objects.equals(this.userId, driverIn.userId) &&
        Objects.equals(this.carId, driverIn.carId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, carId);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DriverIn {\n");
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    carId: ").append(toIndentedString(carId)).append("\n");
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

