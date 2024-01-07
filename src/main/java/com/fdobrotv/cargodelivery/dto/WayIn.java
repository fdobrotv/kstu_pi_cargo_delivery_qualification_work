package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
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
 * WayIn
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T20:25:02.083454+02:00[Europe/Sofia]")
public class WayIn {

  private String name;

  private String description;

  private UUID departureSettlementId;

  private UUID destinationSettlementId;

  @Valid
  private List<UUID> roadIds = new ArrayList<>();

  public WayIn() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public WayIn(String name, String description, UUID departureSettlementId, UUID destinationSettlementId, List<UUID> roadIds) {
    this.name = name;
    this.description = description;
    this.departureSettlementId = departureSettlementId;
    this.destinationSettlementId = destinationSettlementId;
    this.roadIds = roadIds;
  }

  public WayIn name(String name) {
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

  public WayIn description(String description) {
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

  public WayIn departureSettlementId(UUID departureSettlementId) {
    this.departureSettlementId = departureSettlementId;
    return this;
  }

  /**
   * Get departureSettlementId
   * @return departureSettlementId
  */
  @NotNull @Valid 
  @Schema(name = "departureSettlementId", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("departureSettlementId")
  public UUID getDepartureSettlementId() {
    return departureSettlementId;
  }

  public void setDepartureSettlementId(UUID departureSettlementId) {
    this.departureSettlementId = departureSettlementId;
  }

  public WayIn destinationSettlementId(UUID destinationSettlementId) {
    this.destinationSettlementId = destinationSettlementId;
    return this;
  }

  /**
   * Get destinationSettlementId
   * @return destinationSettlementId
  */
  @NotNull @Valid 
  @Schema(name = "destinationSettlementId", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("destinationSettlementId")
  public UUID getDestinationSettlementId() {
    return destinationSettlementId;
  }

  public void setDestinationSettlementId(UUID destinationSettlementId) {
    this.destinationSettlementId = destinationSettlementId;
  }

  public WayIn roadIds(List<UUID> roadIds) {
    this.roadIds = roadIds;
    return this;
  }

  public WayIn addRoadIdsItem(UUID roadIdsItem) {
    if (this.roadIds == null) {
      this.roadIds = new ArrayList<>();
    }
    this.roadIds.add(roadIdsItem);
    return this;
  }

  /**
   * Get roadIds
   * @return roadIds
  */
  @NotNull @Valid 
  @Schema(name = "roadIds", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("roadIds")
  public List<UUID> getRoadIds() {
    return roadIds;
  }

  public void setRoadIds(List<UUID> roadIds) {
    this.roadIds = roadIds;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    WayIn wayIn = (WayIn) o;
    return Objects.equals(this.name, wayIn.name) &&
        Objects.equals(this.description, wayIn.description) &&
        Objects.equals(this.departureSettlementId, wayIn.departureSettlementId) &&
        Objects.equals(this.destinationSettlementId, wayIn.destinationSettlementId) &&
        Objects.equals(this.roadIds, wayIn.roadIds);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, description, departureSettlementId, destinationSettlementId, roadIds);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class WayIn {\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    departureSettlementId: ").append(toIndentedString(departureSettlementId)).append("\n");
    sb.append("    destinationSettlementId: ").append(toIndentedString(destinationSettlementId)).append("\n");
    sb.append("    roadIds: ").append(toIndentedString(roadIds)).append("\n");
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

