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
import type { Point } from './Point';
import {
    PointFromJSON,
    PointFromJSONTyped,
    PointToJSON,
} from './Point';

/**
 * 
 * @export
 * @interface IncidentIn
 */
export interface IncidentIn {
    /**
     * 
     * @type {string}
     * @memberof IncidentIn
     */
    description: string;
    /**
     * 
     * @type {Date}
     * @memberof IncidentIn
     */
    dateTime: Date;
    /**
     * 
     * @type {string}
     * @memberof IncidentIn
     */
    carId: string;
    /**
     * 
     * @type {string}
     * @memberof IncidentIn
     */
    driverId: string;
    /**
     * 
     * @type {Point}
     * @memberof IncidentIn
     */
    coordinates: Point;
}

/**
 * Check if a given object implements the IncidentIn interface.
 */
export function instanceOfIncidentIn(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "dateTime" in value;
    isInstance = isInstance && "carId" in value;
    isInstance = isInstance && "driverId" in value;
    isInstance = isInstance && "coordinates" in value;

    return isInstance;
}

export function IncidentInFromJSON(json: any): IncidentIn {
    return IncidentInFromJSONTyped(json, false);
}

export function IncidentInFromJSONTyped(json: any, ignoreDiscriminator: boolean): IncidentIn {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': json['description'],
        'dateTime': (new Date(json['dateTime'])),
        'carId': json['carId'],
        'driverId': json['driverId'],
        'coordinates': PointFromJSON(json['coordinates']),
    };
}

export function IncidentInToJSON(value?: IncidentIn | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'dateTime': (value.dateTime.toISOString()),
        'carId': value.carId,
        'driverId': value.driverId,
        'coordinates': PointToJSON(value.coordinates),
    };
}

