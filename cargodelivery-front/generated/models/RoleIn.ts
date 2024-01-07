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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface RoleIn
 */
export interface RoleIn {
    /**
     * 
     * @type {string}
     * @memberof RoleIn
     */
    name: string;
}

/**
 * Check if a given object implements the RoleIn interface.
 */
export function instanceOfRoleIn(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function RoleInFromJSON(json: any): RoleIn {
    return RoleInFromJSONTyped(json, false);
}

export function RoleInFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoleIn {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
    };
}

export function RoleInToJSON(value?: RoleIn | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
    };
}
