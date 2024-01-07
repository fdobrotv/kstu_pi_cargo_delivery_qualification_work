/* tslint:disable */
/* eslint-disable */
/**
 * Cargo delivery
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Order,
  OrderIn,
} from '../models/index';
import {
    OrderFromJSON,
    OrderToJSON,
    OrderInFromJSON,
    OrderInToJSON,
} from '../models/index';

export interface CreateOrderRequest {
    orderIn?: OrderIn;
}

export interface DeleteOrderByIdRequest {
    id: string;
}

export interface GetOrderByIdRequest {
    id: string;
}

export interface ListOrdersRequest {
    limit?: number;
}

/**
 * 
 */
export class OrdersApi extends runtime.BaseAPI {

    /**
     * Create a order
     */
    async createOrderRaw(requestParameters: CreateOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Order>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/orders`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OrderInToJSON(requestParameters.orderIn),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
    }

    /**
     * Create a order
     */
    async createOrder(requestParameters: CreateOrderRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Order> {
        const response = await this.createOrderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete specific order by id
     */
    async deleteOrderByIdRaw(requestParameters: DeleteOrderByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteOrderById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/orders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete specific order by id
     */
    async deleteOrderById(requestParameters: DeleteOrderByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteOrderByIdRaw(requestParameters, initOverrides);
    }

    /**
     * Info for a specific order
     */
    async getOrderByIdRaw(requestParameters: GetOrderByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Order>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getOrderById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/orders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
    }

    /**
     * Info for a specific order
     */
    async getOrderById(requestParameters: GetOrderByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Order> {
        const response = await this.getOrderByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List all orders
     */
    async listOrdersRaw(requestParameters: ListOrdersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Order>>> {
        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/orders`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OrderFromJSON));
    }

    /**
     * List all orders
     */
    async listOrders(requestParameters: ListOrdersRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Order>> {
        const response = await this.listOrdersRaw(requestParameters, initOverrides);
        return await response.value();
    }

}