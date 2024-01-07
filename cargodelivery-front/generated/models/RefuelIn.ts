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
 * @interface RefuelIn
 */
export interface RefuelIn {
    /**
     * 
     * @type {number}
     * @memberof RefuelIn
     */
    price: number;
    /**
     * 
     * @type {Date}
     * @memberof RefuelIn
     */
    dateTime: Date;
    /**
     * 
     * @type {string}
     * @memberof RefuelIn
     */
    fuelStationId: string;
    /**
     * 
     * @type {string}
     * @memberof RefuelIn
     */
    carId: string;
    /**
     * 
     * @type {string}
     * @memberof RefuelIn
     */
    driverId: string;
}

/**
 * Check if a given object implements the RefuelIn interface.
 */
export function instanceOfRefuelIn(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "price" in value;
    isInstance = isInstance && "dateTime" in value;
    isInstance = isInstance && "fuelStationId" in value;
    isInstance = isInstance && "carId" in value;
    isInstance = isInstance && "driverId" in value;

    return isInstance;
}

export function RefuelInFromJSON(json: any): RefuelIn {
    return RefuelInFromJSONTyped(json, false);
}

export function RefuelInFromJSONTyped(json: any, ignoreDiscriminator: boolean): RefuelIn {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'price': json['price'],
        'dateTime': (new Date(json['dateTime'])),
        'fuelStationId': json['fuelStationId'],
        'carId': json['carId'],
        'driverId': json['driverId'],
    };
}

export function RefuelInToJSON(value?: RefuelIn | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'price': value.price,
        'dateTime': (value.dateTime.toISOString()),
        'fuelStationId': value.fuelStationId,
        'carId': value.carId,
        'driverId': value.driverId,
    };
}
