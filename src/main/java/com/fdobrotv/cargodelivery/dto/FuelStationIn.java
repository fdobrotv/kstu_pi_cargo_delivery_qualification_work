package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fdobrotv.cargodelivery.dto.Point;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * FuelStationIn
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T20:25:02.083454+02:00[Europe/Sofia]")
public class FuelStationIn {

  private String name;

  private String description;

  private Point coordinates;

  public FuelStationIn() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public FuelStationIn(String name, String description, Point coordinates) {
    this.name = name;
    this.description = description;
    this.coordinates = coordinates;
  }

  public FuelStationIn name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Get name
   * @return name
  */
  @NotNull 
  @Schema(name = "name", example = "Лукойл 55", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("name")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public FuelStationIn description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Get description
   * @return description
  */
  @NotNull 
  @Schema(name = "description", example = "Заправка на 8 грузовых машин с кафе", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("description")
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public FuelStationIn coordinates(Point coordinates) {
    this.coordinates = coordinates;
    return this;
  }

  /**
   * Get coordinates
   * @return coordinates
  */
  @NotNull @Valid 
  @Schema(name = "coordinates", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("coordinates")
  public Point getCoordinates() {
    return coordinates;
  }

  public void setCoordinates(Point coordinates) {
    this.coordinates = coordinates;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    FuelStationIn fuelStationIn = (FuelStationIn) o;
    return Objects.equals(this.name, fuelStationIn.name) &&
        Objects.equals(this.description, fuelStationIn.description) &&
        Objects.equals(this.coordinates, fuelStationIn.coordinates);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, description, coordinates);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class FuelStationIn {\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    coordinates: ").append(toIndentedString(coordinates)).append("\n");
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

