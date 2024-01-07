package com.fdobrotv.cargodelivery.configuration;

import com.fdobrotv.cargodelivery.dto.CarColor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;

@Configuration
public class CarColorConverterConfiguration {

    @Bean
    Converter<String, CarColor> carColorConverter() {
        return new Converter<String, CarColor>() {
            @Override
            public CarColor convert(String source) {
                return CarColor.fromValue(source);
            }
        };
    }

}
