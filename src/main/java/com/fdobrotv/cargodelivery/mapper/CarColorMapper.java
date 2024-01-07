package com.fdobrotv.cargodelivery.mapper;

import com.fdobrotv.cargodelivery.dto.CarColor;

public class CarColorMapper {
    public static CarColor toDTO(com.fdobrotv.cargodelivery.entity.enums.CarColor carColorEntityEnum) {
        return CarColor.fromValue(carColorEntityEnum.name());
    }

    public static com.fdobrotv.cargodelivery.entity.enums.CarColor toEntity(CarColor color) {
        return com.fdobrotv.cargodelivery.entity.enums.CarColor.fromValue(color.getValue());
    }
}
