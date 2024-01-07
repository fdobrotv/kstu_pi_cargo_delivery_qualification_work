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
 * @interface Road
 */
export interface Road {
    /**
     * 
     * @type {string}
     * @memberof Road
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Road
     */
    description: string;
    /**
     * 
     * @type {Array<Point>}
     * @memberof Road
     */
    path: Array<Point>;
    /**
     * 
     * @type {string}
     * @memberof Road
     */
    id: string;
}

/**
 * Check if a given object implements the Road interface.
 */
export function instanceOfRoad(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "path" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function RoadFromJSON(json: any): Road {
    return RoadFromJSONTyped(json, false);
}

export function RoadFromJSONTyped(json: any, ignoreDiscriminator: boolean): Road {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': json['description'],
        'path': ((json['path'] as Array<any>).map(PointFromJSON)),
        'id': json['id'],
    };
}

export function RoadToJSON(value?: Road | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'path': ((value.path as Array<any>).map(PointToJSON)),
        'id': value.id,
    };
}

