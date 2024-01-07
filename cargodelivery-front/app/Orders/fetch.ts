import {
    Order,
    OrdersApi,
    Configuration,
    ListOrdersRequest,
    ConfigurationParameters,
    DeleteOrderByIdRequest,
    CreateOrderRequest,
    OrderIn,
} from "@/generated";

let configurationParameters: ConfigurationParameters =
{basePath: "http://127.0.0.1:8080/v1"};
let configuration = new Configuration(configurationParameters);
let ordersApi = new OrdersApi(configuration);

export function create(orderIn: OrderIn): Promise<Order> {
    let createOrderRequest: CreateOrderRequest = {orderIn: orderIn}
    let createdOrder: Promise<Order> = ordersApi.createOrder(createOrderRequest);
    return createdOrder;
}

export function getOrders(): Promise<Array<Order>> {
    let listOrdersRequest: ListOrdersRequest = {limit: 100}
    let orders: Promise<Array<Order>> = ordersApi.listOrders(listOrdersRequest);
    return orders;
}

export function deleteById(orderId: string): Promise<void> {
    let deleteOrderByIdRequest: DeleteOrderByIdRequest = {id: orderId}
    let deletePromise: Promise<void> = ordersApi.deleteOrderById(deleteOrderByIdRequest);
    return deletePromise;
}