package com.fdobrotv.cargodelivery.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.math.BigDecimal;
import java.util.UUID;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * OrderIn
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2024-01-07T13:43:58.566610636+03:00[Europe/Moscow]")
public class OrderIn {

  private UUID userId;

  private UUID departureSettlementId;

  private UUID destinationSettlementId;

  private BigDecimal weight;

  private BigDecimal volume;

  private Integer price;

  public OrderIn() {
    super();
  }

  /**
   * Constructor with only required parameters
   */
  public OrderIn(UUID userId, UUID departureSettlementId, UUID destinationSettlementId, BigDecimal weight, BigDecimal volume, Integer price) {
    this.userId = userId;
    this.departureSettlementId = departureSettlementId;
    this.destinationSettlementId = destinationSettlementId;
    this.weight = weight;
    this.volume = volume;
    this.price = price;
  }

  public OrderIn userId(UUID userId) {
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

  public OrderIn departureSettlementId(UUID departureSettlementId) {
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

  public OrderIn destinationSettlementId(UUID destinationSettlementId) {
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

  public OrderIn weight(BigDecimal weight) {
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

  public OrderIn volume(BigDecimal volume) {
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

  public OrderIn price(Integer price) {
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
    OrderIn orderIn = (OrderIn) o;
    return Objects.equals(this.userId, orderIn.userId) &&
        Objects.equals(this.departureSettlementId, orderIn.departureSettlementId) &&
        Objects.equals(this.destinationSettlementId, orderIn.destinationSettlementId) &&
        Objects.equals(this.weight, orderIn.weight) &&
        Objects.equals(this.volume, orderIn.volume) &&
        Objects.equals(this.price, orderIn.price);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, departureSettlementId, destinationSettlementId, weight, volume, price);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class OrderIn {\n");
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    departureSettlementId: ").append(toIndentedString(departureSettlementId)).append("\n");
    sb.append("    destinationSettlementId: ").append(toIndentedString(destinationSettlementId)).append("\n");
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

