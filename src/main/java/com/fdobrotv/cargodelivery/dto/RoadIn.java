package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fdobrotv.cargodelivery.dto.Point;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * RoadIn
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T13:43:58.566610636+03:00[Europe/Moscow]")
public class RoadIn {

  private String name;

  private String description;

  @Valid
  private List<@Valid Point> path = new ArrayList<>();

  public RoadIn() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public RoadIn(String name, String description, List<@Valid Point> path) {
    this.name = name;
    this.description = description;
    this.path = path;
  }

  public RoadIn name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Get name
   * @return name
  */
  @NotNull 
  @Schema(name = "name", example = "M-1", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("name")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public RoadIn description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Get description
   * @return description
  */
  @NotNull 
  @Schema(name = "description", example = "Moscow to Minsk", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("description")
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public RoadIn path(List<@Valid Point> path) {
    this.path = path;
    return this;
  }

  public RoadIn addPathItem(Point pathItem) {
    if (this.path == null) {
      this.path = new ArrayList<>();
    }
    this.path.add(pathItem);
    return this;
  }

  /**
   * Get path
   * @return path
  */
  @NotNull @Valid 
  @Schema(name = "path", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("path")
  public List<@Valid Point> getPath() {
    return path;
  }

  public void setPath(List<@Valid Point> path) {
    this.path = path;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RoadIn roadIn = (RoadIn) o;
    return Objects.equals(this.name, roadIn.name) &&
        Objects.equals(this.description, roadIn.description) &&
        Objects.equals(this.path, roadIn.path);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, description, path);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RoadIn {\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    path: ").append(toIndentedString(path)).append("\n");
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
