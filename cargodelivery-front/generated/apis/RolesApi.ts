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
  Role,
  RoleIn,
} from '../models/index';
import {
    RoleFromJSON,
    RoleToJSON,
    RoleInFromJSON,
    RoleInToJSON,
} from '../models/index';

export interface CreateRoleRequest {
    roleIn?: RoleIn;
}

export interface DeleteRoleByIdRequest {
    id: string;
}

export interface GetRoleByIdRequest {
    id: string;
}

export interface ListRolesRequest {
    limit?: number;
}

/**
 * 
 */
export class RolesApi extends runtime.BaseAPI {

    /**
     * Create a role
     */
    async createRoleRaw(requestParameters: CreateRoleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Role>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/roles`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RoleInToJSON(requestParameters.roleIn),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RoleFromJSON(jsonValue));
    }

    /**
     * Create a role
     */
    async createRole(requestParameters: CreateRoleRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Role> {
        const response = await this.createRoleRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete specific role by id
     */
    async deleteRoleByIdRaw(requestParameters: DeleteRoleByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteRoleById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/roles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete specific role by id
     */
    async deleteRoleById(requestParameters: DeleteRoleByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteRoleByIdRaw(requestParameters, initOverrides);
    }

    /**
     * Info for a specific role
     */
    async getRoleByIdRaw(requestParameters: GetRoleByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Role>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getRoleById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/roles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RoleFromJSON(jsonValue));
    }

    /**
     * Info for a specific role
     */
    async getRoleById(requestParameters: GetRoleByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Role> {
        const response = await this.getRoleByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List all roles
     */
    async listRolesRaw(requestParameters: ListRolesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Role>>> {
        const queryParameters: any = {};

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/roles`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(RoleFromJSON));
    }

    /**
     * List all roles
     */
    async listRoles(requestParameters: ListRolesRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Role>> {
        const response = await this.listRolesRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
