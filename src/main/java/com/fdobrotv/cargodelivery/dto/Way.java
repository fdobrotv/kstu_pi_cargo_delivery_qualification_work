package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fdobrotv.cargodelivery.dto.Road;
import com.fdobrotv.cargodelivery.dto.Settlement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * Way
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T20:25:02.083454+02:00[Europe/Sofia]")
public class Way {

  private UUID id;

  private String name;

  private String description;

  private Settlement departureSettlement;

  private Settlement destinationSettlement;

  @Valid
  private List<@Valid Road> roads = new ArrayList<>();

  public Way() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public Way(UUID id, String name, String description, Settlement departureSettlement, Settlement destinationSettlement, List<@Valid Road> roads) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.departureSettlement = departureSettlement;
    this.destinationSettlement = destinationSettlement;
    this.roads = roads;
  }

  public Way id(UUID id) {
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

  public Way name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Get name
   * @return name
  */
  @NotNull 
  @Schema(name = "name", example = "Путь из Москвы в Сочи", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("name")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Way description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Get description
   * @return description
  */
  @NotNull 
  @Schema(name = "description", example = "Тур из Москвы в Анталию", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("description")
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Way departureSettlement(Settlement departureSettlement) {
    this.departureSettlement = departureSettlement;
    return this;
  }

  /**
   * Get departureSettlement
   * @return departureSettlement
  */
  @NotNull @Valid 
  @Schema(name = "departureSettlement", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("departureSettlement")
  public Settlement getDepartureSettlement() {
    return departureSettlement;
  }

  public void setDepartureSettlement(Settlement departureSettlement) {
    this.departureSettlement = departureSettlement;
  }

  public Way destinationSettlement(Settlement destinationSettlement) {
    this.destinationSettlement = destinationSettlement;
    return this;
  }

  /**
   * Get destinationSettlement
   * @return destinationSettlement
  */
  @NotNull @Valid 
  @Schema(name = "destinationSettlement", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("destinationSettlement")
  public Settlement getDestinationSettlement() {
    return destinationSettlement;
  }

  public void setDestinationSettlement(Settlement destinationSettlement) {
    this.destinationSettlement = destinationSettlement;
  }

  public Way roads(List<@Valid Road> roads) {
    this.roads = roads;
    return this;
  }

  public Way addRoadsItem(Road roadsItem) {
    if (this.roads == null) {
      this.roads = new ArrayList<>();
    }
    this.roads.add(roadsItem);
    return this;
  }

  /**
   * Get roads
   * @return roads
  */
  @NotNull @Valid 
  @Schema(name = "roads", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("roads")
  public List<@Valid Road> getRoads() {
    return roads;
  }

  public void setRoads(List<@Valid Road> roads) {
    this.roads = roads;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Way way = (Way) o;
    return Objects.equals(this.id, way.id) &&
        Objects.equals(this.name, way.name) &&
        Objects.equals(this.description, way.description) &&
        Objects.equals(this.departureSettlement, way.departureSettlement) &&
        Objects.equals(this.destinationSettlement, way.destinationSettlement) &&
        Objects.equals(this.roads, way.roads);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, description, departureSettlement, destinationSettlement, roads);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Way {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    departureSettlement: ").append(toIndentedString(departureSettlement)).append("\n");
    sb.append("    destinationSettlement: ").append(toIndentedString(destinationSettlement)).append("\n");
    sb.append("    roads: ").append(toIndentedString(roads)).append("\n");
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

