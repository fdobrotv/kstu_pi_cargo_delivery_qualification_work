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
import type { CarColor } from './CarColor';
import {
    CarColorFromJSON,
    CarColorFromJSONTyped,
    CarColorToJSON,
} from './CarColor';

/**
 * 
 * @export
 * @interface CarIn
 */
export interface CarIn {
    /**
     * 
     * @type {string}
     * @memberof CarIn
     */
    markId: string;
    /**
     * 
     * @type {string}
     * @memberof CarIn
     */
    modelId: string;
    /**
     * 
     * @type {string}
     * @memberof CarIn
     */
    plateNumber: string;
    /**
     * 
     * @type {CarColor}
     * @memberof CarIn
     */
    color: CarColor;
}

/**
 * Check if a given object implements the CarIn interface.
 */
export function instanceOfCarIn(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "markId" in value;
    isInstance = isInstance && "modelId" in value;
    isInstance = isInstance && "plateNumber" in value;
    isInstance = isInstance && "color" in value;

    return isInstance;
}

export function CarInFromJSON(json: any): CarIn {
    return CarInFromJSONTyped(json, false);
}

export function CarInFromJSONTyped(json: any, ignoreDiscriminator: boolean): CarIn {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'markId': json['markId'],
        'modelId': json['modelId'],
        'plateNumber': json['plateNumber'],
        'color': CarColorFromJSON(json['color']),
    };
}

export function CarInToJSON(value?: CarIn | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'markId': value.markId,
        'modelId': value.modelId,
        'plateNumber': value.plateNumber,
        'color': CarColorToJSON(value.color),
    };
}

