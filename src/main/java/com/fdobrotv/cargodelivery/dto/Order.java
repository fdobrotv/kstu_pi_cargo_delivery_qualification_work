package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fdobrotv.cargodelivery.dto.Settlement;
import com.fdobrotv.cargodelivery.dto.User;
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
 * Order
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T13:43:58.566610636+03:00[Europe/Moscow]")
public class Order {

  private UUID id;

  private User user;

  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
  private OffsetDateTime createdAt;

  private Settlement departureSettlement;

  private Settlement destinationSettlement;

  private BigDecimal weight;

  private BigDecimal volume;

  private Integer price;

  public Order() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public Order(UUID id, User user, OffsetDateTime createdAt, Settlement departureSettlement, Settlement destinationSettlement, BigDecimal weight, BigDecimal volume, Integer price) {
    this.id = id;
    this.user = user;
    this.createdAt = createdAt;
    this.departureSettlement = departureSettlement;
    this.destinationSettlement = destinationSettlement;
    this.weight = weight;
    this.volume = volume;
    this.price = price;
  }

  public Order id(UUID id) {
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

  public Order user(User user) {
    this.user = user;
    return this;
  }

  /**
   * Get user
   * @return user
  */
  @NotNull @Valid 
  @Schema(name = "user", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("user")
  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Order createdAt(OffsetDateTime createdAt) {
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

  public Order departureSettlement(Settlement departureSettlement) {
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

  public Order destinationSettlement(Settlement destinationSettlement) {
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

  public Order weight(BigDecimal weight) {
    this.weight = weight;
    return this;
  }

  /**
   * Get weight
   * @return weight
  */
  @NotNull @Valid 
  @Schema(name = "weight", example = "215", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("weight")
  public BigDecimal getWeight() {
    return weight;
  }

  public void setWeight(BigDecimal weight) {
    this.weight = weight;
  }

  public Order volume(BigDecimal volume) {
    this.volume = volume;
    return this;
  }

  /**
   * Get volume
   * @return volume
  */
  @NotNull @Valid 
  @Schema(name = "volume", example = "0.85", requiredMode = Schema.RequiredMode.REQUIRED)
  @JsonProperty("volume")
  public BigDecimal getVolume() {
    return volume;
  }

  public void setVolume(BigDecimal volume) {
    this.volume = volume;
  }

  public Order price(Integer price) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Order order = (Order) o;
    return Objects.equals(this.id, order.id) &&
        Objects.equals(this.user, order.user) &&
        Objects.equals(this.createdAt, order.createdAt) &&
        Objects.equals(this.departureSettlement, order.departureSettlement) &&
        Objects.equals(this.destinationSettlement, order.destinationSettlement) &&
        Objects.equals(this.weight, order.weight) &&
        Objects.equals(this.volume, order.volume) &&
        Objects.equals(this.price, order.price);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, user, createdAt, departureSettlement, destinationSettlement, weight, volume, price);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Order {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    user: ").append(toIndentedString(user)).append("\n");
    sb.append("    createdAt: ").append(toIndentedString(createdAt)).append("\n");
    sb.append("    departureSettlement: ").append(toIndentedString(departureSettlement)).append("\n");
    sb.append("    destinationSettlement: ").append(toIndentedString(destinationSettlement)).append("\n");
    sb.append("    weight: ").append(toIndentedString(weight)).append("\n");
    sb.append("    volume: ").append(toIndentedString(volume)).append("\n");
    sb.append("    price: ").append(toIndentedString(price)).append("\n");
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

