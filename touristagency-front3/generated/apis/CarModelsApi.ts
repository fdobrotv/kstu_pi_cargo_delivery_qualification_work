/* tslint:disable */
/* eslint-disable */
/**
 * Tourist agency
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
  CarModel,
  CarModelIn,
} from '../models/index';
import {
    CarModelFromJSON,
    CarModelToJSON,
    CarModelInFromJSON,
    CarModelInToJSON,
} from '../models/index';

export interface CreateCarModelRequest {
    carModelIn?: CarModelIn;
}

export interface DeleteCarModelByIdRequest {
    id: string;
}

export interface ListCarModelsRequest {
    limit?: number;
}

export interface ShowCarModelByIdRequest {
    id: string;
}

/**
 * 
 */
export class CarModelsApi extends runtime.BaseAPI {

    /**
     * Create a car model
     */
    async createCarModelRaw(requestParameters: CreateCarModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CarModel>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/carModels`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CarModelInToJSON(requestParameters.carModelIn),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CarModelFromJSON(jsonValue));
    }

    /**
     * Create a car model
     */
    async createCarModel(requestParameters: CreateCarModelRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CarModel> {
        const response = await this.createCarModelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete specific car model by id
     */
    async deleteCarModelByIdRaw(requestParameters: DeleteCarModelByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteCarModelById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/carModels/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete specific car model by id
     */
    async deleteCarModelById(requestParameters: DeleteCarModelByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteCarModelByIdRaw(requestParameters, initOverrides);
    }

    /**
     * List all car models
     */
    async listCarModelsRaw(requestParameters: ListCarModelsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<CarModel>>> {
        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/carModels`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CarModelFromJSON));
    }

    /**
     * List all car models
     */
    async listCarModels(requestParameters: ListCarModelsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<CarModel>> {
        const response = await this.listCarModelsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Info for a specific car model
     */
    async showCarModelByIdRaw(requestParameters: ShowCarModelByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CarModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling showCarModelById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/carModels/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CarModelFromJSON(jsonValue));
    }

    /**
     * Info for a specific car model
     */
    async showCarModelById(requestParameters: ShowCarModelByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CarModel> {
        const response = await this.showCarModelByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
