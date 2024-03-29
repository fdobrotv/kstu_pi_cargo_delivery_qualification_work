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
import type { Car } from './Car';
import {
    CarFromJSON,
    CarFromJSONTyped,
    CarToJSON,
} from './Car';
import type { Driver } from './Driver';
import {
    DriverFromJSON,
    DriverFromJSONTyped,
    DriverToJSON,
} from './Driver';
import type { Point } from './Point';
import {
    PointFromJSON,
    PointFromJSONTyped,
    PointToJSON,
} from './Point';

/**
 * 
 * @export
 * @interface WorkSlot
 */
export interface WorkSlot {
    /**
     * 
     * @type {string}
     * @memberof WorkSlot
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof WorkSlot
     */
    startedAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof WorkSlot
     */
    finishedAt: Date;
    /**
     * 
     * @type {Car}
     * @memberof WorkSlot
     */
    car: Car;
    /**
     * 
     * @type {Driver}
     * @memberof WorkSlot
     */
    driver: Driver;
    /**
     * 
     * @type {Point}
     * @memberof WorkSlot
     */
    startCoordinates: Point;
    /**
     * 
     * @type {Point}
     * @memberof WorkSlot
     */
    endCoordinates: Point;
}

/**
 * Check if a given object implements the WorkSlot interface.
 */
export function instanceOfWorkSlot(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "startedAt" in value;
    isInstance = isInstance && "finishedAt" in value;
    isInstance = isInstance && "car" in value;
    isInstance = isInstance && "driver" in value;
    isInstance = isInstance && "startCoordinates" in value;
    isInstance = isInstance && "endCoordinates" in value;

    return isInstance;
}

export function WorkSlotFromJSON(json: any): WorkSlot {
    return WorkSlotFromJSONTyped(json, false);
}

export function WorkSlotFromJSONTyped(json: any, ignoreDiscriminator: boolean): WorkSlot {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'startedAt': (new Date(json['startedAt'])),
        'finishedAt': (new Date(json['finishedAt'])),
        'car': CarFromJSON(json['car']),
        'driver': DriverFromJSON(json['driver']),
        'startCoordinates': PointFromJSON(json['startCoordinates']),
        'endCoordinates': PointFromJSON(json['endCoordinates']),
    };
}

export function WorkSlotToJSON(value?: WorkSlot | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'startedAt': (value.startedAt.toISOString()),
        'finishedAt': (value.finishedAt.toISOString()),
        'car': CarToJSON(value.car),
        'driver': DriverToJSON(value.driver),
        'startCoordinates': PointToJSON(value.startCoordinates),
        'endCoordinates': PointToJSON(value.endCoordinates),
    };
}

