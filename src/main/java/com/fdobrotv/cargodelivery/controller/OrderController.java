package com.fdobrotv.cargodelivery.controller;

import com.fdobrotv.cargodelivery.api.OrdersApi;
import com.fdobrotv.cargodelivery.dto.Order;
import com.fdobrotv.cargodelivery.dto.OrderIn;
import com.fdobrotv.cargodelivery.service.CRUDService;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
@RequestMapping("${openapi.cargoDelivery.base-path:/v1}")
public class OrderController implements OrdersApi {

    private final CRUDService<Order, OrderIn> orderService;

    public OrderController(CRUDService<Order, OrderIn> orderService) {
        this.orderService = orderService;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return OrdersApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteOrderById(UUID id) {
        orderService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<Order> createOrder(OrderIn orderIn) {
        Order order = orderService.create(orderIn);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @Override
    public ResponseEntity<List<Order>> listOrders(Integer limit) {
        //TODO: De hard-code it.
        int pageNumber = 0;
        PageRequest pageRequest = PageRequest.of(pageNumber, limit);
        List<Order> orders = orderService.getList(pageRequest);
        return ResponseEntity.status(HttpStatus.OK).body(orders);
    }
}
