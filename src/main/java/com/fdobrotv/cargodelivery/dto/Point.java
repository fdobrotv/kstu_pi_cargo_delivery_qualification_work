package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.math.BigDecimal;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * Point
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T20:25:02.083454+02:00[Europe/Sofia]")
public class Point {

  private BigDecimal longitude;

  private BigDecimal latitude;

  public Point() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public Point(BigDecimal longitude, BigDecimal latitude) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  public Point longitude(BigDecimal longitude) {
    this.longitude = longitude;
    return this;
  }

  /**
   * longitude for coordinate
   * @return longitude
  */
  @NotNull @Valid 
  @Schema(name = "longitude", example = "55.751059669259625", description = "longitude for coordinate", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("longitude")
  public BigDecimal getLongitude() {
    return longitude;
  }

  public void setLongitude(BigDecimal longitude) {
    this.longitude = longitude;
  }

  public Point latitude(BigDecimal latitude) {
    this.latitude = latitude;
    return this;
  }

  /**
   * latitude for coordinate
   * @return latitude
  */
  @NotNull @Valid 
  @Schema(name = "latitude", example = "37.61768042058358", description = "latitude for coordinate", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("latitude")
  public BigDecimal getLatitude() {
    return latitude;
  }

  public void setLatitude(BigDecimal latitude) {
    this.latitude = latitude;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Point point = (Point) o;
    return Objects.equals(this.longitude, point.longitude) &&
        Objects.equals(this.latitude, point.latitude);
  }

  @Override
  public int hashCode() {
    return Objects.hash(longitude, latitude);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Point {\n");
    sb.append("    longitude: ").append(toIndentedString(longitude)).append("\n");
    sb.append("    latitude: ").append(toIndentedString(latitude)).append("\n");
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

